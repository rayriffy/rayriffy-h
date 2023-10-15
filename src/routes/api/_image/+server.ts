import { env } from '$env/dynamic/private'

import { createRequestHandler } from '@urami/core'

import type { RequestHandler } from './$types'

const requestHandler = createRequestHandler({
  remoteDomains: ['i.nhentai.net', 't.nhentai.net'],
  allowedDomains:
    env.IMAGE_DOMAIN !== undefined ? [env.IMAGE_DOMAIN] : undefined,
})

export const GET: RequestHandler = ({ request }) => requestHandler(request)
