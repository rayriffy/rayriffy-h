import {
  parseAdvancedSearch,
  hentaiMatchesAdvancedSearch,
  paginateItems
} from '@riffyh/commons'
import type { Hentai } from '@riffyh/commons'

export const searchHentai = (
  query: string,
  page: number,
  hentais: readonly Hentai[],
  filteredTags: string[] = []
) => {
  const parsed = parseAdvancedSearch(query)
  const filteredHentais = hentais.filter(hentai =>
    hentaiMatchesAdvancedSearch(hentai, parsed, filteredTags)
  )

  const { totalPages, items } = paginateItems(filteredHentais, page)

  return {
    totalPages,
    hentais: items,
  }
}
