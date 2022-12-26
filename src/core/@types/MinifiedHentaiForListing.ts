import type { Hentai } from './Hentai'
import type { Tag } from './Tag'
import type { TagType } from './TagType'

export type MinifiedHentaiForListing = Omit<Hentai, 'tags' | 'title'> & {
  title: string
  tags: {
    name: TagType
    amount: number
  }[]
  languages: Tag[]
}
