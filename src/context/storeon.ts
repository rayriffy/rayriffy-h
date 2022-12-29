import { createStoreon } from 'storeon'

import { persistState } from '@storeon/localstorage'
import { crossTab } from '@storeon/crosstab'
import { useStoreon } from '@storeon/svelte'

import { collection } from './states/collection'
import type { CollectionStore } from './@types/CollectionStore'
import type { CollectionEvent } from './@types/CollectionEvent'

import { settings } from './states/settings'
import type { SettingsStore } from './@types/SettingsStore'
import type { SettingsEvent } from './@types/SettingsEvent'

import { history } from './states/history'
import type { HistoryStore } from './@types/HistoryStore'
import type { HistoryEvent } from './@types/HistoryEvent'

import { search } from './states/search'
import type { SearchStore } from './@types/SearchStore'
import type { SearchEvent } from './@types/SearchEvent'

import { metadata } from './states/metadata'
import type { MetadataStore } from './@types/MetadataStore'
import type { MetadataEvent } from './@types/MetadataEvent'

export type Store = CollectionStore &
  SettingsStore &
  HistoryStore &
  SearchStore &
  MetadataStore
export type Event = CollectionEvent &
  SettingsEvent &
  HistoryEvent &
  SearchEvent &
  MetadataEvent

export const store = createStoreon<Store, Event>([
  settings,
  collection,
  history,
  metadata,
  search,
  ...(typeof window !== 'undefined'
    ? [
        persistState(['settings', 'collection', 'history']),
        persistState(['search'], {
          storage: sessionStorage,
        }),
        crossTab({
          filter: (event, data) => event.toString().startsWith('search/'),
        }),
      ]
    : []),
])
