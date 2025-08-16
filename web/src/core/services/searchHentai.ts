import {
  buildMergedAdvancedSearch,
  hentaiMatchesAdvancedSearch,
  paginateMatches,
} from '@riffyh/commons'
import type { Hentai } from '@riffyh/commons'

export const searchHentai = (
  query: string,
  page: number,
  hentais: readonly Hentai[],
  filteredTags: string[] = []
) => {
  const parsed = buildMergedAdvancedSearch(query, filteredTags)
  const { totalPages, items } = paginateMatches(hentais, page, hentai =>
    hentaiMatchesAdvancedSearch(hentai, parsed)
  )

  return {
    totalPages,
    hentais: items,
  }
}
