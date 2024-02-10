import type { Hentai, Tag, TagType } from '@riffyh/commons'

export type MinifiedHentaiForListing = Omit<Hentai, 'tags' | 'title'> & {
  title: string
  tags: {
    name: TagType
    amount: number
  }[]
  languages: Tag[]
}
