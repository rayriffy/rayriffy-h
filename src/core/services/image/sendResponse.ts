import type { ResponsePayload } from '../../@types/image/ResponsePayload'

export const sendResponse = (
  payload: ResponsePayload,
  cacheHit: 'HIT' | 'MISS',
  extraHeaders: Record<string, string> = {}
) =>
  new Response(payload.buffer, {
    headers: {
      Vary: 'Accept',
      'Content-Type': payload.contentType ?? '',
      'Cache-Control': `public, max-age=${payload.maxAge}, must-revalidate`,
      'Content-Length': Buffer.byteLength(payload.buffer).toString(),
      'Content-Security-Policy':
        "script-src 'none'; frame-src 'none'; sandbox;",
      'Strict-Transport-Security':
        'max-age=31536000; includeSubDomains; preload',
      ETag: payload.etag,
      'X-RiffyH-Cache': cacheHit,
      ...extraHeaders,
    },
  })
