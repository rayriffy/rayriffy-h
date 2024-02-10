import { itemsPerPage } from '@riffyh/commons'

import { searchHentai } from '$core/services/searchHentai'
import { hentaiToMinifiedHentaiForListing } from '$core/services/hentaiToMinifiedHentaiForListing'

import type { Hentai } from '@riffyh/commons'
import type { ListingResult } from '$core/@types/ListingResult'

export const getCollectionListing = (
  page: number,
  query: string,
  hentais: readonly Hentai[]
): ListingResult => {
  const queryResult =
    query === ''
      ? {
          totalPages: Math.ceil(hentais.length / itemsPerPage),
          hentais: hentais.slice(
            (page - 1) * itemsPerPage,
            itemsPerPage * page
          ),
        }
      : searchHentai(query, page, hentais)

  return {
    maxPage: queryResult.totalPages,
    items: queryResult.hentais.map(o => hentaiToMinifiedHentaiForListing(o)),
  }
}
