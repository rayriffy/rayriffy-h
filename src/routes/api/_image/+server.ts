import { requestHandler } from 'svelte-aio/api'

import type { RequestHandler } from './$types'

export const GET: RequestHandler = requestHandler({
  remoteDomains: ['i.nhentai.net', 't.nhentai.net'],
  allowedDomains: ['next.h.rayriffy.com'],
})
