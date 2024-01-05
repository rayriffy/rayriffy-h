import { createTRPCSvelteServer } from 'trpc-svelte-query/server'
import { router, createContext } from '$trpc/router'

export const server = createTRPCSvelteServer({
  endpoint: '/api/trpc',
  router,
  createContext,
})
