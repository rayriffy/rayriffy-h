import { Hentai } from './Hentai'
import { Tag } from './Tag'
import { TagType } from './TagType'

export type MinifiedHentaiForListing = Omit<Hentai, 'tags' | 'title'> & {
  title: string
  tags: {
    name: TagType
    amount: number
  }[]
  languages: Tag[]
}
