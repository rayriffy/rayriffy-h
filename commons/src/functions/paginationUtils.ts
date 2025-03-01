import { itemsPerPage } from '../constants/itemsPerPage'

/**
 * Calculate pagination information for a collection of items
 * @param items The full array of items to paginate
 * @param page The current page number (1-based)
 * @param perPage Number of items per page (defaults to itemsPerPage constant)
 * @returns Pagination information including total pages and paginated items
 */
export const paginateItems = <T>(
  items: readonly T[],
  page: number,
  perPage: number = itemsPerPage
) => {
  const totalPages = Math.ceil(items.length / perPage)
  const startIndex = (page - 1) * perPage
  const endIndex = startIndex + perPage
  const paginatedItems = items.slice(startIndex, endIndex)

  return {
    totalPages,
    items: paginatedItems,
    totalItems: items.length,
    currentPage: page,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1
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