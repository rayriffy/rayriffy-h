import { env } from '$env/dynamic/private'

import { requestHandler } from 'svelte-aio/api'

import type { RequestHandler } from './$types'

export const GET: RequestHandler = event => {
  return requestHandler({
    remoteDomains: ['i.nhentai.net', 't.nhentai.net'],
    allowedDomains:
      env.IMAGE_DOMAIN !== undefined ? [env.IMAGE_DOMAIN] : undefined,
  })(event)
}
