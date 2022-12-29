import type { CollectionStore } from './CollectionStore'

export interface CollectionEvent {
  'collection/override': CollectionStore
}
