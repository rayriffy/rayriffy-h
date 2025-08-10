import type { Hentai } from '../@types/Hentai'
import type { Tag } from '../@types/Tag'
import type { TagType } from '../@types/TagType'

// ---------------- Advanced search (parser + matcher) ----------------

type PagesOperator = 'gt' | 'gte' | 'lt' | 'lte' | 'eq'

export interface ParsedAdvancedSearch {
  include: Array<{
    scope: 'any' | 'tag'
    tagType?: TagType
    term: string
  }>
  exclude: Array<{
    scope: 'any' | 'tag'
    tagType?: TagType
    term: string
  }>
  pages: Array<{ op: PagesOperator; value: number }>
}

const namespaceToTagType: Record<string, TagType> = {
  parody: 'parody',
  parodies: 'parody',
  tag: 'tag',
  tags: 'tag',
  language: 'language',
  languages: 'language',
  character: 'character',
  characters: 'character',
  group: 'group',
  groups: 'group',
  artist: 'artist',
  artists: 'artist',
  category: 'category',
  categories: 'category',
}

const normalizeString = (value: unknown): string => String(value ?? '').toLowerCase()

const parsePagesConstraint = (raw: string): { op: PagesOperator; value: number } | null => {
  const m = raw.match(/^(>=|<=|>|<)?\s*(\d{1,6})$/)
  if (!m) return null
  const [, sym, numStr] = m
  const value = Number(numStr)
  let op: PagesOperator = 'eq'
  if (sym === '>') op = 'gt'
  else if (sym === '>=') op = 'gte'
  else if (sym === '<') op = 'lt'
  else if (sym === '<=') op = 'lte'
  return { op, value }
}

/**
 * Parse an advanced local search query.
 * Supports:
 * - multiple terms (AND)
 * - exclusion with leading '-'
 * - quoted phrases
 * - tag namespaces (e.g., parodies:, tag:, artist:, ...)
 * - pages constraints (pages:20, pages:>20, pages:<=30)
 */
export const parseAdvancedSearch = (query: string): ParsedAdvancedSearch => {
  const result: ParsedAdvancedSearch = { include: [], exclude: [], pages: [] }
  if (!query || !query.trim()) return result

  // Tokenizer: [-]?[namespace:]? (quoted phrase | token)
  const tokenRe = /(-)?(?:(\w+):)?(?:"([^"]+)"|([^\s]+))/g
  let match: RegExpExecArray | null
  while ((match = tokenRe.exec(query)) !== null) {
    const isExclusion = !!match[1]
    const namespace = match[2]?.toLowerCase()
    const quoted = match[3]
    const bare = match[4]
    const rawValue = quoted ?? bare ?? ''
    const value = normalizeString(rawValue)
    if (!value) continue

    // pages constraint
    if (namespace === 'pages') {
      const constraint = parsePagesConstraint(value)
      if (constraint) result.pages.push(constraint)
      continue
    }

    const entry = {
      scope: 'any' as const,
      term: value,
    }

    // tag namespaces
    if (namespace && namespaceToTagType[namespace]) {
      const tagged = {
        scope: 'tag' as const,
        tagType: namespaceToTagType[namespace],
        term: value,
      }
      ;(isExclusion ? result.exclude : result.include).push(tagged)
      continue
    }

    // generic namespace is treated as ANY (title + tags + id)
    ;(isExclusion ? result.exclude : result.include).push(entry)
  }

  return result
}

const satisfiesPages = (numPages: number, constraints: ParsedAdvancedSearch['pages']): boolean => {
  for (const c of constraints) {
    if (c.op === 'eq' && !(numPages === c.value)) return false
    if (c.op === 'gt' && !(numPages > c.value)) return false
    if (c.op === 'gte' && !(numPages >= c.value)) return false
    if (c.op === 'lt' && !(numPages < c.value)) return false
    if (c.op === 'lte' && !(numPages <= c.value)) return false
  }
  return true
}

const anyStringIncludes = (haystacks: string[], needle: string): boolean => {
  return haystacks.some(v => v.includes(needle))
}

const getGenericSearchFields = (hentai: Hentai): string[] => {
  return [
    hentai.id,
    hentai.title.english,
    hentai.title.japanese,
    hentai.title.pretty,
    ...hentai.tags.map(t => t.name),
  ].map(normalizeString)
}

const getTagFieldsByType = (hentai: Hentai, tagType: TagType): string[] => {
  return hentai.tags.filter(t => t.type === tagType).map(t => normalizeString(t.name))
}

/**
 * Match a hentai item against a parsed advanced query, with optional globally filtered tags.
 */
export const hentaiMatchesAdvancedSearch = (
  hentai: Hentai,
  parsed: ParsedAdvancedSearch
): boolean => {
  // 1) Pages constraints
  if (!satisfiesPages(hentai.num_pages, parsed.pages)) return false

  // 2) Exclusions
  const genericFields = getGenericSearchFields(hentai)
  for (const ex of parsed.exclude) {
    if (ex.scope === 'any') {
      if (anyStringIncludes(genericFields, ex.term)) return false
    } else if (ex.scope === 'tag' && ex.tagType) {
      const tagFields = getTagFieldsByType(hentai, ex.tagType)
      if (anyStringIncludes(tagFields, ex.term)) return false
    }
  }

  // 3) Inclusions (AND semantics; empty means pass)
  for (const inc of parsed.include) {
    if (inc.scope === 'any') {
      if (!anyStringIncludes(genericFields, inc.term)) return false
    } else if (inc.scope === 'tag' && inc.tagType) {
      const tagFields = getTagFieldsByType(hentai, inc.tagType)
      if (!anyStringIncludes(tagFields, inc.term)) return false
    }
  }

  return true
}

/**
 * Merge user query with persistent filteredTags by converting them into
 * exclusion terms and combining with the parsed query.
 */
export const buildMergedAdvancedSearch = (
  query: string,
  filteredTags: string[] = []
): ParsedAdvancedSearch => {
  const base = parseAdvancedSearch(query)
  if (!filteredTags.length) return base

  // Transform filters like ["tag:big", "language:japanese"] into
  // a negative query: "-tag:big -language:japanese"
  const negativeQuery = filteredTags
    .filter(s => (s ?? '').toString().trim() !== '')
    .map(s => `-${s}`)
    .join(' ')

  const parsedFilters = parseAdvancedSearch(negativeQuery)

  return {
    include: [...base.include, ...parsedFilters.include],
    exclude: [...base.exclude, ...parsedFilters.exclude],
    // Do not inherit any pages constraint from filteredTags
    pages: base.pages,
  }
}

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