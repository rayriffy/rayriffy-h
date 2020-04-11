import { IImage } from './IImage'
import { ITag } from './ITag'

export interface IHentai {
  id: number
  media_id: string
  title: {
    english: string
    japanese: string
    pretty: string
  }
  images: {
    cover: IImage
    pages: IImage[]
  }
  tags: ITag[]
}
