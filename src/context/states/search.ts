import { StoreonModule } from 'storeon'

import { SearchStore, SearchCache } from '../@types/SearchStore'
import { SearchEvent } from '../@types/SearchEvent'

export const search: StoreonModule<SearchStore, SearchEvent> = store => {
  store.on('@init', () => {
    const defaultState: SearchCache = {
      query: '',
      page: 1,
      maxPage: 5,
      loading: true,
    }

    return {
      search: {
        main: defaultState,
        listing: defaultState,
        collection: defaultState,
      },
    }
  })

  store.on('search/update', (state, event) => {
    // eslint-disable-next-line prefer-const
    let payload = {
      ...state,
    }

    payload.search[event.target] = {
      ...payload.search[event.target],
      ...event.value,
    }

    return payload
  })

  store.on('search/query', (state, event) => {
    // eslint-disable-next-line prefer-const
    let payload = {
      ...state,
    }

    payload.search[event.target] = {
      query: event.value,
      page: 1,
      maxPage: 1,
      loading: true,
    }

    return payload
  })

  store.on('search/override', (state, event) => event)
}
