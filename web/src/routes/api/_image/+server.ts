import { env } from '$env/dynamic/private'

import { createRequestHandler } from '@urami/core'

import type { RequestHandler } from './$types'
import {URL} from "node:url";

const requestHandler = createRequestHandler({
  remoteDomains: ['i.nhentai.net', 't.nhentai.net'],
  allowedDomains:
    env.IMAGE_DOMAIN !== undefined ? [env.IMAGE_DOMAIN] : undefined,
})

export const GET: RequestHandler = async ({ request }) => {
  try {
    const response = await requestHandler(request)

    if (response.ok)
      return response
    else
      throw response
  } catch (error) {
    // get current search params, get 'url' params. if .webp at the end then replace with .jpg. if .jpg at the end then replace with .webp. otherwise do nothing
    const fullRequestUrl = new URL(request.url)
    const url = fullRequestUrl.searchParams.get('url') ?? ''

    if (['.jpg', '.webp'].some(ext => url.endsWith(ext))) {
      fullRequestUrl.searchParams.set('url', url.endsWith('.jpg') ? url.replace('.jpg', '.webp') : url.replace('.webp', '.jpg'))
      return requestHandler(new Request(fullRequestUrl.toString()))
    } else {
      return error as Response
    }
  }
}
