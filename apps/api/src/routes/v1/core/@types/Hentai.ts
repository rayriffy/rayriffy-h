import { Image } from './Image'
import { Tag } from './Tag'

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
}
