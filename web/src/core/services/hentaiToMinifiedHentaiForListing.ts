import { filterTagsByType, getHentaiDisplayTitle } from '@riffyh/commons'

import { tags } from '../constants/tags'

import type { Hentai } from '@riffyh/commons'
import type { MinifiedHentaiForListing } from '../@types/MinifiedHentaiForListing'

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
    amount: filterTagsByType(hentai.tags, tag.name).length,
  })),
  languages: filterTagsByType(hentai.tags, 'language'),
  title: getHentaiDisplayTitle(hentai),
})
