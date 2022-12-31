import { searchHentai } from '$core/services/searchHentai'
import { itemsPerPage } from '$core/constants/itemsPerPage'

import type { Hentai } from '$core/@types/Hentai'
import type { ListingResult } from '$core/@types/ListingResult'
import { hentaiToMinifiedHentaiForListing } from '$core/services/hentaiToMinifiedHentaiForListing'

export const getCollectionListing = (
  page: number,
  query: string,
  hentais: Hentai[]
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
