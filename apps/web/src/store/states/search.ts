import { StoreonModule } from 'storeon'

import { SearchStore, SearchCache } from '../@types/SearchStore'
import { SearchEvent } from '../@types/SearchEvent'

export const search: StoreonModule<SearchStore, SearchEvent> = store => {
  store.on('@init', () => {
    const defaultState: SearchCache = {
      input: '',
      query: '',
      first: true,
      res: [],
      page: 1,
      maxPage: 5,
      renderedRaw: [],
      mode: 'list',
    }

    return {
      search: {
        search: defaultState,
        collection: defaultState,
      }
    }
  })

  store.on('search/update', (state, event) => {
    // eslint-disable-next-line prefer-const
    let payload = {
      ...state
    }

    payload.search[event.target] = {
      ...payload.search[event.target],
      ...event.value,
    }

    return payload
  })

  // store.on('search/toggle', (state, event) => {
  //   switch (event) {
  //     case 'safemode':
  //       return {
  //         ...state,
  //         settings: {
  //           ...state.settings,
  //           safemode: !state.settings.safemode,
  //         },
  //       }
  //     default:
  //       return state
  //   }
  // })

  store.on('search/override', (state, event) => event)
}
