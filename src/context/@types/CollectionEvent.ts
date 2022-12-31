import type { Hentai } from '$core/@types/Hentai'
import type { CollectionStore } from './CollectionStore'

export interface CollectionEvent {
  'collection/toggle': Hentai
  'collection/override': CollectionStore
}
