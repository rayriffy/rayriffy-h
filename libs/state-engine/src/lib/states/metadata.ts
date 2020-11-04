import { StoreonModule } from 'storeon'

import { MetadataStore } from '../@types/MetadataStore'
import { MetadataEvent } from '../@types/MetadataEvent'

export const metadata: StoreonModule<MetadataStore, MetadataEvent> = store => {
  store.on('@init', () => ({
    metadata: {
      viewCount: 0,
    },
  }))

  store.on('metadata/viewCount/count', (state, event) => {
    return {
      ...state,
      metadata: {
        ...state.metadata,
        viewCount: state.metadata.viewCount + 1,
      },
    }
  })

  store.on('metadata/viewCount/reset', (state, event) => {
    return {
      ...state,
      metadata: {
        ...state.metadata,
        viewCount: 0,
      },
    }
  })
}
