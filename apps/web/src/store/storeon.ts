import { createStoreon } from 'storeon'

import { persistState } from '@storeon/localstorage'
import { crossTab } from '@storeon/crosstab'

import { collection } from './states/collection'
import { settings } from './states/settings'
import { subtitle } from './states/subtitle'

import { CollectionStore } from './@types/CollectionStore'
import { SettingsStore } from './@types/SettingsStore'
import { SubtitleStore } from './@types/SubtitleStore'

import { CollectionEvent } from './@types/CollectionEvent'
import { SettingsEvent } from './@types/SettingsEvent'
import { SubtitleEvent } from './@types/SubtitleEvent'

export type Store = CollectionStore & SettingsStore & SubtitleStore
export type Event = CollectionEvent & SettingsEvent & SubtitleEvent

export const store = createStoreon<Store, Event>([
  settings,
  collection,
  subtitle,
  ...typeof window !== 'undefined' ? [
    persistState(['settings', 'collection']),
    crossTab({ filter: (event, data) => event !== 'subtitle/setSubtitle' }),
  ] : []
])
