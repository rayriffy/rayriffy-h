import { StoreonModule } from 'storeon'

import { HistoryStore } from '../@types/HistoryStore'
import { HistoryEvent } from '../@types/HistoryEvent'

import { itemsPerPage } from '../../core/constants/itemsPerPage'

export const history: StoreonModule<HistoryStore, HistoryEvent> = store => {
  store.on('@init', () => ({
    history: {
      version: 1,
      items: [],
    },
  }))

  store.on('history/toggle', (state, event) => {
    return {
      ...state,
      history: {
        ...state.history,
        items: [
          event,
          ...state.history.items.filter(o => o.data.id !== event.data.id),
        ].slice(0, itemsPerPage),
      },
    }
  })

  store.on('history/override', (state, event) => event)
}
