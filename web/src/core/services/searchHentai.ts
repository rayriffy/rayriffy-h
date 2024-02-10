import { itemsPerPage } from '@riffyh/commons'
import type { Hentai } from '@riffyh/commons'

export const searchHentai = (
  query: string,
  page: number,
  hentais: readonly Hentai[],
  filteredTags: string[] = []
) => {
  const splittedQueries = query
    .split(' ')
    .filter(o => o !== '')
    .map(o => o.toLowerCase())

  const filteredHentais = hentais.filter(hentai => {
    return (
      // item must not contain filtered tags
      hentai.tags
        .map(t => t.name.toLowerCase())
        .every(t => !filteredTags.includes(t)) &&
      // items must match some of queries
      splittedQueries.every(query => {
        return [
          hentai.id,
          hentai.title.english,
          hentai.title.japanese,
          hentai.title.pretty,
          ...hentai.tags.map(o => o.name),
        ]
          .map(o => String(o ?? '').toLowerCase())
          .some(o => o.includes(query))
      })
    )
  })

  return {
    totalPages: Math.ceil(filteredHentais.length / itemsPerPage),
    hentais: filteredHentais.slice(
      (page - 1) * itemsPerPage,
      itemsPerPage * page
    ),
  }
}
