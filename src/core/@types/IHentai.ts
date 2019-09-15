import { IImage } from './IImage'
import { ITag } from './ITag'

export interface IHentai {
  id: number
  media_id: number
  title: {
    english: string
    japanese: string
    pretty: string
  }
  images: {
    cover: IImage
    pages: IImage[]
    thumbnail: IImage
  }
  scanlator: string
  upload_date: number
  tags: ITag[]
  num_pages: number
  num_favorites: number
}
