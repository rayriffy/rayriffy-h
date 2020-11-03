import { SearchStore, SearchCache } from './SearchStore'

export interface SearchEvent {
  'search/update': {
    target: keyof SearchStore['search']
    value: Partial<SearchCache>
  }
  'search/query': {
    target: keyof SearchStore['search']
    value: string
  }
  'search/override': SearchStore
}
