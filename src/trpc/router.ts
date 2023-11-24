import { createTRPCRouter } from './utils'
import { collectionRouter } from './routes/collection'
import { hentaiRouter } from './routes/hentai'

import type { RequestEvent } from '@sveltejs/kit'
import type { inferAsyncReturnType } from '@trpc/server'

export const createContext = async (_event: RequestEvent) => {
  return {}
}

export type Context = inferAsyncReturnType<typeof createContext>

export const router = createTRPCRouter({
  collection: collectionRouter,
  hentai: hentaiRouter,
})
