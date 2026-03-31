import { sanitizeContent } from './sanitizeContent'
import type { Hentai } from '../@types/Hentai'
import { NhentaiGallery } from '../@types/nhentai/NhentaiGallery'

export const getHentaiFromNH = async (id: string | number): Promise<Hentai> => {
  const data = await fetch(
    `https://nhentai.net/api/v2/galleries/${id.toString()}`
  ).then(o => {
    if (o.ok) return o.json() as Promise<NhentaiGallery>
    else throw o
  })

  const convertedGallery: Hentai = {
    id: data.id,
    media_id: data.media_id,
    title: data.title,
    num_pages: data.num_pages,
    images: {
      cover: {
        w: data.cover.width,
        h: data.cover.height,
        t: 'j',
      },
      pages: data.pages.map(page => ({
        w: page.width,
        h: page.height,
        t: 'j'
      }))
    },
    tags: data.tags.map(tag => ({
      id: tag.slug,
      name: tag.name,
      type: tag.type,
    }))
  }

  return sanitizeContent(convertedGallery)
}
