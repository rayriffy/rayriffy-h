import { createStoreon } from 'storeon'

import { persistState } from '@storeon/localstorage'
import { crossTab } from '@storeon/crosstab'

import { collection } from './states/collection'
import { CollectionStore } from './@types/CollectionStore'
import { CollectionEvent } from './@types/CollectionEvent'

import { settings } from './states/settings'
import { SettingsStore } from './@types/SettingsStore'
import { SettingsEvent } from './@types/SettingsEvent'

import { subtitle } from './states/subtitle'
import { SubtitleStore } from './@types/SubtitleStore'
import { SubtitleEvent } from './@types/SubtitleEvent'

import { history } from './states/history'
import { HistoryStore } from './@types/HistoryStore'
import { HistoryEvent } from './@types/HistoryEvent'

export type Store = CollectionStore & SettingsStore & SubtitleStore & HistoryStore
export type Event = CollectionEvent & SettingsEvent & SubtitleEvent & HistoryEvent

export const store = createStoreon<Store, Event>([
  settings,
  collection,
  subtitle,
  history,
  ...typeof window !== 'undefined' ? [
    persistState(['settings', 'collection', 'history']),
    crossTab({ filter: (event, data) => event !== 'subtitle/setSubtitle' }),
  ] : []
])
