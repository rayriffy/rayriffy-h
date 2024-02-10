import type { Hentai } from './Hentai'
import type { Image } from './Image'
import type { Tag } from './Tag'

export interface NHHentai extends Omit<Hentai, 'tags'> {
  images: Hentai['images'] & {
    thumbnail: Image
  }
  scanlator: string
  upload_date: number
  tags: NHTag[]
  num_favorites: number
}

export interface NHTag extends Omit<Tag, 'id'> {
  id: number
  url: string
  count: number
}
