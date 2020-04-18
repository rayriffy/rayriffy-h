import { Hentai } from '../@types/Hentai'

export const rawHentaiToHentai = (hentai: Hentai): Hentai => {
  return {
    id: Number(hentai.id),
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
