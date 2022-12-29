import type { StoreonModule } from 'storeon'

import type { CollectionStore } from '../@types/CollectionStore'
import type { CollectionEvent } from '../@types/CollectionEvent'

export const collection: StoreonModule<
  CollectionStore,
  CollectionEvent
> = store => {
  store.on('@init', () => ({
    collection: {
      version: 2,
      data: [],
    },
  }))

  store.on('collection/override', (state, event) => event)
}
