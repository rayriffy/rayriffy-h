import { useStoreon } from '@storeon/svelte'

import type { Store, Event } from './storeon'

export const useStore = (...keys: (keyof Store)[]) =>
  useStoreon<Store, Event>(...keys)

export { store } from './storeon'
