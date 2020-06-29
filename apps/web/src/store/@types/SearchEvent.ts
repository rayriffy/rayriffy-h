import { SearchStore, SearchCache } from './SearchStore'

export interface SearchEvent {
  'search/update': {
    target: 'collection' | 'search'
    value: Partial<SearchCache>
  }
  'search/override': SearchStore
}
