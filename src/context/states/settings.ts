import type { StoreonModule } from 'storeon'

import type { SettingsStore } from '../@types/SettingsStore'
import type { SettingsEvent } from '../@types/SettingsEvent'

export const settings: StoreonModule<SettingsStore, SettingsEvent> = store => {
  store.on('@init', () => ({
    settings: {
      safemode: true,
    },
  }))

  store.on('setting/toggle', (state, event) => {
    switch (event) {
      case 'safemode':
        return {
          ...state,
          settings: {
            ...state.settings,
            safemode: !state.settings.safemode,
          },
        }
      default:
        return state
    }
  })

  store.on('setting/override', (state, event) => event)
}
