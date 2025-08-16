import { env } from '$env/dynamic/private'

import { createRequestHandler } from '@urami/core'

import type { RequestHandler } from './$types'
import { URL } from 'node:url'

const requestHandler = createRequestHandler({
  remoteDomains: [
    'i.nhentai.net',
    'i1.nhentai.net',
    'i2.nhentai.net',
    'i3.nhentai.net',
    'i4.nhentai.net',
    'i5.nhentai.net',
    'i6.nhentai.net',
    'i7.nhentai.net',
    't.nhentai.net',
    't1.nhentai.net',
    't2.nhentai.net',
    't3.nhentai.net',
    't4.nhentai.net',
    't5.nhentai.net',
    't6.nhentai.net',
    't7.nhentai.net',
  ],
  allowedDomains:
    env.IMAGE_DOMAIN !== undefined ? [env.IMAGE_DOMAIN] : undefined,
})

export const GET: RequestHandler = async ({ request }) => {
  const fullRequestUrl = new URL(request.url)
  const originalUrl = fullRequestUrl.searchParams.get('url') ?? ''

  // Check if URL is valid and determine correct format
  const checkUrlFormat = async (url: string): Promise<string | null> => {
    try {
      // Use HEAD request to check if the URL is valid without downloading content
      const headResponse = await fetch(url, {
        method: 'HEAD',
        headers: {
          Accept: 'image/*',
        },
      })

      if (headResponse.ok) {
        // If response is ok, the format is correct
        return url
      }

      return null
    } catch {
      return null
    }
  }

  try {
    // Check if the original URL format is correct
    const validUrl = await checkUrlFormat(originalUrl)

    if (validUrl) {
      // Original URL is valid, proceed with requestHandler
      return requestHandler(request)
    } else if (['.jpg', '.webp'].some(ext => originalUrl.endsWith(ext))) {
      // Original URL failed but has image extension, try alternate format
      const alternateUrl = originalUrl.endsWith('.jpg')
        ? originalUrl.replace('.jpg', '.webp')
        : originalUrl.replace('.webp', '.jpg')

      const isAlternateValid = await checkUrlFormat(alternateUrl)

      if (isAlternateValid) {
        // Alternate URL is valid, update request and proceed
        fullRequestUrl.searchParams.set('url', alternateUrl)
        const modifiedRequest = new Request(fullRequestUrl.toString())
        return requestHandler(modifiedRequest)
      }
    }

    // If we get here, both formats failed
    throw new Response('Image not found', { status: 404 })
  } catch (error) {
    if (error instanceof Response) return error
    return new Response('Error fetching image', { status: 500 })
  }
}
