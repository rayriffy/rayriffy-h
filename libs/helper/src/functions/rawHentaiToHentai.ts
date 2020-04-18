import { Hentai } from '../@types/Hentai'
import { RawHentai } from '../@types/RawHentai'

export const rawHentaiToHentai = (hentai: RawHentai): Hentai => {
  return {
    id: hentai.id,
    media_id: hentai.media_id,
    title: hentai.title,
    images: {
      cover: hentai.images.cover,
      pages: hentai.images.pages,
    },
    tags: hentai.tags.map(o => ({
      id: o.id,
      name: o.name,
      type: o.type,
    })),
  }
}
