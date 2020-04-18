import { Hentai } from './Hentai'
import { Image } from './Image'
import { RawTag } from './RawTag'

export interface RawHentai extends Hentai {
  upload_date: string
  num_favorites: string
  images: {
    cover: Image
    pages: Image[]
    thumbnail: Image
  }
  scanlator: string
  tags: RawTag[]
  num_pages: number
}
