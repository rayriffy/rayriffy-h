import { persistentAtom } from '@nanostores/persistent'

import type { Favorite } from './@types/Favorite'

export const collection = persistentAtom<Favorite[]>('collection', [], {
  encode: JSON.stringify,
  decode: JSON.parse,
})
