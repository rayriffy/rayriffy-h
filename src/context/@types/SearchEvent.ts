import type { SearchStore } from './SearchStore'

export interface SearchEvent {
  'search/query': {
    target: keyof SearchStore['search']
    value: string
  }
  'search/override': SearchStore
}
