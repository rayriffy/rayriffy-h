import type { Image } from './Image'
import type { Tag } from './Tag'

export interface Hentai {
  id: number
  media_id: string
  title: {
    english: string
    japanese: string
    pretty: string
  }
  images: {
    cover: Image
    pages: Image[]
  }
  tags: Tag[]
  num_pages: number
}
