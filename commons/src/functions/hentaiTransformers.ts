import type { Hentai } from '../@types/Hentai'
import type { Tag } from '../@types/Tag'
import type { TagType } from '../@types/TagType'

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

/**
 * Create a minified version of a hentai object
 * Removes page images to reduce size
 * @param hentai Full hentai object
 * @returns Minified hentai object with empty pages array
 */
export const minifyHentai = (hentai: Hentai): Hentai => {
  return {
    ...hentai,
    images: {
      ...hentai.images,
      pages: []
    }
  }
}

/**
 * Count tags by type in a hentai object
 * @param hentai Hentai object
 * @param tagTypes Array of tag types to count
 * @returns Array of tag counts by type
 */
export const countTagsByType = (
  hentai: Hentai,
  tagTypes: TagType[]
): { name: TagType; amount: number }[] => {
  return tagTypes.map(tagType => ({
    name: tagType,
    amount: filterTagsByType(hentai.tags, tagType).length,
  }))
}

/**
 * Apply a series of transformations to a hentai object
 * @param hentai Original hentai object
 * @param transformers Array of transformer functions to apply
 * @returns Transformed hentai object
 */
export const transformHentai = <T>(
  hentai: Hentai,
  transformers: Array<(h: any) => any>
): T => {
  return transformers.reduce((result, transformer) => {
    return transformer(result)
  }, hentai) as T
}

/**
 * Get an array of languages from a hentai object
 * @param hentai Hentai object
 * @returns Array of language tags
 */
export const getHentaiLanguages = (hentai: Hentai): Tag[] => {
  return filterTagsByType(hentai.tags, 'language')
}