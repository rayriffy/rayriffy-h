import { 
  itemsPerPage, 
  hentaiMatchesSearch, 
  prepareSearchQueries 
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

  return {
    totalPages: Math.ceil(filteredHentais.length / itemsPerPage),
    hentais: filteredHentais.slice(
      (page - 1) * itemsPerPage,
      itemsPerPage * page
    ),
  }
}
