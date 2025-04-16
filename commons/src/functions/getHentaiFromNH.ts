import { sanitizeContent } from './sanitizeContent'
import type { Hentai } from '../@types/Hentai'

export const getHentaiFromNH = async (id: string | number): Promise<Hentai> => {
  const data = await fetch(`https://nhentai.net/api/gallery/${id}`).then(o => {
    if (o.ok) return o.json() as Promise<Hentai>
    else throw o
  })

  return sanitizeContent(data)
}
