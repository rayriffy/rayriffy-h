import { HifuminImage } from './HifuminImage'
import { HifuminTag } from './HifuminTag'

export interface HifuminHentai {
  id: number
  title: {
    display: string
    english: string
    japanese: string
  }
  images: {
    cover: HifuminImage
    pages: HifuminImage[]
  }
  info: {
    amount: number
    mediaId: string
  }
  metadata: {
    language: string
    parodies: HifuminTag[]
    characters: HifuminTag[]
    groups: HifuminTag[]
    categories: HifuminTag[]
    artists: HifuminTag[]
    tags: HifuminTag[]
  }
}
