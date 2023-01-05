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
    allowedDomains: [
      'next.h.rayriffy.com',
      'xn--vdkuc.xn--dck3c9b5d7d.xn--q9jyb4c',
    ],
  })(event)
}
