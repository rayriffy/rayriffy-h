import { persistentMap } from '@nanostores/persistent'

import type { Settings } from './@types/Settings'

export const settings = persistentMap<Settings>(
  'settings',
  {
    safemode: false,
  },
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
)
