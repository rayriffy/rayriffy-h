import { env } from '$env/dynamic/private'
import { RIFFYH_BUILD_MODE } from '$env/static/public'

import { requestHandler } from 'svelte-aio/api'

import type { RequestHandler } from './$types'

export const GET: RequestHandler = event => {
  if (RIFFYH_BUILD_MODE !== 'private') {
    return new Response('not found', {
      status: 404,
    })
  }

  return requestHandler({
    remoteDomains: ['i.nhentai.net', 't.nhentai.net'],
    allowedDomains:
      env.IMAGE_DOMAIN !== undefined ? [env.IMAGE_DOMAIN] : undefined,
  })(event)
}
