import type { StoreonModule } from 'storeon'

import type { SearchStore } from '../@types/SearchStore'
import type { SearchEvent } from '../@types/SearchEvent'

export const search: StoreonModule<SearchStore, SearchEvent> = store => {
  store.on('@init', () => {
    return {
      search: {
        main: '',
        listing: '',
        collection: '',
      },
    }
  })

  store.on('search/query', (state, event) => {
    // eslint-disable-next-line prefer-const
    let payload = {
      ...state,
    }

    payload.search[event.target] = event.value

    return payload
  })

  store.on('search/override', (state, event) => event)
}
