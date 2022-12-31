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

  store.on('collection/toggle', (state, event) => {
    // check is this hentai already in collection
    const isExistInCollection =
      state.collection.data.find(o => Number(o.id) === Number(event.id)) !==
      undefined

    // if exist then remove hentai from collection, otherwise add hentai to collection
    if (isExistInCollection) {
      return {
        ...state,
        collection: {
          ...state.collection,
          data: state.collection.data.filter(
            o => Number(o.id) !== Number(event.id)
          ),
        },
      }
    } else {
      return {
        ...state,
        collection: {
          ...state.collection,
          data: [
            {
              id: event.id,
              internal: false,
              data: { ...event, images: { ...event.images, pages: [] } },
            },
            ...state.collection.data,
          ],
        },
      }
    }
  })

  store.on('collection/override', (state, event) => event)
}
