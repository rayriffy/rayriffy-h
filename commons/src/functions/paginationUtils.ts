import { itemsPerPage } from '../constants/itemsPerPage'

/**
 * Stream through items and paginate only matched entries using a predicate.
 * Avoids materializing the full filtered array in memory.
 */
export const paginateMatches = <T>(
  items: readonly T[],
  page: number,
  predicate: (item: T) => boolean,
  perPage: number = itemsPerPage
) => {
  const startIndex = (page - 1) * perPage
  const endIndex = startIndex + perPage

  const pageItems: T[] = []
  let matchCount = 0

  for (const item of items) {
    if (!predicate(item)) continue
    if (matchCount >= startIndex && matchCount < endIndex) {
      pageItems.push(item)
    }
    matchCount += 1
  }

  const totalPages = Math.ceil(matchCount / perPage)
  return {
    totalPages,
    items: pageItems,
    totalItems: matchCount,
    currentPage: page,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  }
}

/**
 * Get pagination parameters for database queries
 * @param page The current page number (1-based)
 * @param perPage Number of items per page (defaults to itemsPerPage constant)
 * @returns Object with offset and limit properties
 */
export const getPaginationParams = (
  page: number,
  perPage: number = itemsPerPage
) => {
  return {
    offset: (page - 1) * perPage,
    limit: perPage
  }
}