import { server } from '$trpc/server'

import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async event => {
  return {
    trpc: server.hydrateToClient(event),
  }
}
