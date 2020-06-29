import { StoreonModule } from 'storeon'

import { SubtitleStore } from '../@types/SubtitleStore'
import { SubtitleEvent } from '../@types/SubtitleEvent'

export const subtitle: StoreonModule<SubtitleStore, SubtitleEvent> = store => {
  store.on('@init', () => ({
    subtitle: 'init',
  }))

  store.on('subtitle/setSubtitle', (state, event) => ({
    ...state,
    subtitle: event,
  }))

  store.on('subtitle/override', (state, event) => event)
}
