import type { SettingsStore } from './SettingsStore'

export interface SettingsEvent {
  'setting/toggle': 'safemode'
  'setting/override': SettingsStore
}
