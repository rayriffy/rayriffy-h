import type { SearchStore } from './SearchStore'

export interface SearchEvent {
  'search/query': {
    target: keyof SearchStore['search']
    query?: string
    page?: number
  }
  'search/override': SearchStore
}
