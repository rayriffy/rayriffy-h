import { IHentai } from '../@types/IHentai'
import { IRawHentai } from '../@types/IRawHentai'

export const rawProcessor = (hentai: IRawHentai): IHentai => {
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
