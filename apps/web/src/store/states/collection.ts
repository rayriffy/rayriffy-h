import { StoreonModule } from 'storeon'

import { CollectionStore } from '../@types/CollectionStore'
import { CollectionEvent } from '../@types/CollectionEvent'

export const collection: StoreonModule<CollectionStore, CollectionEvent> = store => {
  store.on('@init', () => ({
    collection: {
      version: 2,
      data: [],
    }
  }))

  store.on('collection/override', (state, event) => event)
}
