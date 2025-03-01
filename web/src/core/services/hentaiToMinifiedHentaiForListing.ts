import { 
  minifyHentai,
  countTagsByType, 
  getHentaiLanguages, 
  getHentaiDisplayTitle,
  transformHentai 
} from '@riffyh/commons'

import { tags } from '../constants/tags'

import type { Hentai } from '@riffyh/commons'
import type { MinifiedHentaiForListing } from '../@types/MinifiedHentaiForListing'

export const hentaiToMinifiedHentaiForListing = (
  hentai: Hentai
): MinifiedHentaiForListing => {
  // First minify to remove pages
  const minified = minifyHentai(hentai)
  
  // Create the transformed object with the correct types
  const result: MinifiedHentaiForListing = {
    ...minified,
    tags: countTagsByType(minified, tags.map(tag => tag.name)),
    languages: getHentaiLanguages(minified),
    title: getHentaiDisplayTitle(minified),
  }
  
  return result
}
