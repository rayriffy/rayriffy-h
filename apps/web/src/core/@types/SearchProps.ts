import { ListingHentai } from './ListingHentai'

export interface SearchProps {
  raw: ListingHentai[]
  skip: number
  showOnEmptyQuery?: boolean
  modeLock?: 'list' | 'nh'
}
