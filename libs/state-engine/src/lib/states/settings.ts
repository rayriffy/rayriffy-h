import { StoreonModule } from 'storeon'

import { SettingsStore } from '../@types/SettingsStore'
import { SettingsEvent } from '../@types/SettingsEvent'

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
