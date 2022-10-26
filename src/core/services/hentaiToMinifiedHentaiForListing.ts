import { filterTagByType } from './filterTagByType'

import { tags } from '../constants/tags'

import { Hentai } from '../@types/Hentai'
import { MinifiedHentaiForListing } from '../@types/MinifiedHentaiForListing'

export const hentaiToMinifiedHentaiForListing = (
  hentai: Hentai
): MinifiedHentaiForListing => ({
  ...hentai,
  images: {
    ...hentai.images,
    pages: [],
  },
  tags: tags.map(tag => ({
    name: tag.name,
    amount: filterTagByType(hentai.tags, tag.name).length,
  })),
  languages: hentai.tags.filter(o => o.type === 'language'),
  title: hentai.title.pretty ?? hentai.title.english ?? hentai.title.japanese,
})
