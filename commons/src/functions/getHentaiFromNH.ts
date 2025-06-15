import { sanitizeContent } from './sanitizeContent'
import type { Hentai } from '../@types/Hentai'

export const getHentaiFromNH = async (id: string | number): Promise<Hentai> => {
  const urlPattern = process.env.NH_PATTERN || 'https://nhentai.net/api/gallery/{0}'

  const data = await fetch(
    urlPattern.replace('{0}', id.toString())
  ).then(o => {
    if (o.ok) return o.json() as Promise<Hentai>
    else throw o
  })

  return sanitizeContent(data)
}
