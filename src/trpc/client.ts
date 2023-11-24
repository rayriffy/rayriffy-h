import { createTRPCClient } from 'trpc-sveltekit'

import type { TRPCClientInit } from 'trpc-sveltekit'
import type { router } from '$trpc/router'

let browserClient: ReturnType<typeof createTRPCClient<typeof router>>

export const api = (init?: TRPCClientInit) => {
  const isBrowser = typeof window !== 'undefined'
  if (isBrowser && browserClient) return browserClient

  const client = createTRPCClient<typeof router>({
    init,
  })

  if (isBrowser) browserClient = client
  return client
}
