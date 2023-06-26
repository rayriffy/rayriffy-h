import { persistentMap } from '@nanostores/persistent'

import { defaultSearch } from './constants/defaultSearch'

import type { Search } from './@types/Search'

export const search = persistentMap<Search>('search-', defaultSearch, {
  encode: JSON.stringify,
  decode: JSON.parse,
  listen: false,
})
