export interface SearchCache {
  // Lock search query when page changes and text input change as well
  query: string
  // Stuff to be rendered
  page: number
  maxPage: number
  loading: boolean
}

export interface SearchStore {
  search: {
    main: SearchCache
    listing: SearchCache
    collection: SearchCache
  }
}
