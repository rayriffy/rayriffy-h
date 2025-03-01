import type { Hentai } from '../@types/Hentai'
import type { Tag } from '../@types/Tag'

/**
 * Filter tags by their type
 * @param tags Array of tags
 * @param type Tag type to filter by
 * @returns Filtered array of tags
 */
export const filterTagsByType = (tags: Tag[], type: string): Tag[] => {
  return tags.filter(tag => tag.type === type)
}

/**
 * Check if a hentai matches search queries and filter criteria
 * @param hentai Hentai object to check
 * @param queries Search queries split into words
 * @param filteredTags Tags to exclude
 * @returns Whether the hentai matches the search criteria
 */
export const hentaiMatchesSearch = (
  hentai: Hentai,
  queries: string[],
  filteredTags: string[] = []
): boolean => {
  return (
    // item must not contain filtered tags
    hentai.tags
      .map(t => t.name.toLowerCase())
      .every(t => !filteredTags.includes(t)) &&
    // items must match some of queries
    queries.every(query => {
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
}

/**
 * Get a display title from a hentai object
 * @param hentai Hentai object
 * @returns The most appropriate title for display
 */
export const getHentaiDisplayTitle = (hentai: Hentai): string => {
  return hentai.title.pretty ?? hentai.title.english ?? hentai.title.japanese
}

/**
 * Prepare search queries by splitting and normalizing a search string
 * @param query Raw search query
 * @returns Processed array of search terms
 */
export const prepareSearchQueries = (query: string): string[] => {
  return query
    .split(' ')
    .filter(o => o !== '')
    .map(o => o.toLowerCase())
}