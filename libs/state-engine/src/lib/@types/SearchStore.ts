import { ListingHentai } from '../../core/@types/ListingHentai'

export interface SearchCache {
  // State for observing raw input
  input: string
  // Lock search query when page changes and text input change as well
  query: string
  // Set search dialog to be show on first time or not
  first: boolean
  // Put all searh results in here (for listing)
  res: ListingHentai[]
  // Set mode between search from list or nhentai (if modeLock is present, then hide the selector and lock search into that mode)
  mode: 'list' | 'nh'
  // Stuff to be rendered
  page: number
  maxPage: number
  renderedRaw: ListingHentai[]
}

export interface SearchStore {
  search: {
    search: SearchCache
    collection: SearchCache
  }
}
