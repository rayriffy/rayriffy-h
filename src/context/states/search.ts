import type { StoreonModule } from 'storeon'

import type { SearchStore } from '../@types/SearchStore'
import type { SearchEvent } from '../@types/SearchEvent'

export const search: StoreonModule<SearchStore, SearchEvent> = store => {
  store.on('@init', () => {
    return {
      search: {
        main: {
          query: '',
        },
        listing: {
          query: '',
        },
        collection: {
          page: 1,
          query: '',
        },
      },
    }
  })

  store.on('search/query', (state, event) => {
    // eslint-disable-next-line prefer-const
    let payload = {
      ...state,
    }

    if (event.query !== undefined)
      payload.search[event.target].query = event.query

    if (event.page !== undefined)
      // @ts-ignore
      payload.search[event.target].page = event.page

    return payload
  })

  store.on('search/override', (state, event) => event)
}
