import { 
  hentaiMatchesSearch, 
  prepareSearchQueries,
  paginateItems
} from '@riffyh/commons'
import type { Hentai } from '@riffyh/commons'

export const searchHentai = (
  query: string,
  page: number,
  hentais: readonly Hentai[],
  filteredTags: string[] = []
) => {
  const splittedQueries = prepareSearchQueries(query)
  const filteredHentais = hentais.filter(hentai => 
    hentaiMatchesSearch(hentai, splittedQueries, filteredTags)
  )

  const { totalPages, items } = paginateItems(filteredHentais, page)

  return {
    totalPages,
    hentais: items,
  }
}
