import { IHentai } from './IHentai'
import { IImage } from './IImage'
import { IRawTag } from './IRawTag'

export interface IRawHentai extends IHentai {
  upload_date: string
  num_favorites: string
  images: {
    cover: IImage
    pages: IImage[]
    thumbnail: IImage
  }
  scanlator: string
  tags: IRawTag[]
  num_pages: number
}
