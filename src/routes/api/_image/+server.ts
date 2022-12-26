import { error } from '@sveltejs/kit'

import axios from 'axios'
import { detectContentType } from '../../../core/services/image/detectContentType'
import { getMaxAge } from '../../../core/services/image/getMaxAge'
import { getSupportedMimeType } from '../../../core/services/image/getSupportedMimeType'
import { getExtension } from '../../../core/services/image/getExtension'
import { AVIF, JPEG, WEBP } from '../../../core/constants/image/mimeTypes'
import { getCacheKey } from '../../../core/services/image/getCacheKey'
import { getHash } from '../../../core/services/image/getHash'
import { optimizeImage } from '../../../core/services/image/optimizeImage'
import { writeImageToFileSystem } from '../../../core/services/image/writeImageToFileSystem'
import { sendResponse } from '../../../core/services/image/sendResponse'
import { readImageFileSystem } from '../../../core/services/image/readImageFileSystem'

import type { RequestHandler } from './$types'
import type { ResponsePayload } from '../../../core/@types/image/ResponsePayload'

export const GET: RequestHandler = async event => {
  let upstreamBuffer: Buffer
  let upstreamType: string | null
  let maxAge: number

  // get variables
  const url = event.url.searchParams.get('url') ?? ''
  const width = Number(event.url.searchParams.get('w') ?? '')
  const quality = Number(event.url.searchParams.get('q') ?? '')

  // get target file type to optimize
  const mimeType = getSupportedMimeType(
    ['image/webp', 'image/avif'],
    event.request.headers.get('accept') ?? ''
  )

  try {
    // find local cache if exists
    const cacheKey = getCacheKey(url, width, quality, mimeType)

    const cacheResponse = await readImageFileSystem(cacheKey)

    if (cacheResponse !== null) {
      return sendResponse(cacheResponse, 'HIT')
    }

    // get image
    const fetchedImage = await axios.get(url, {
      responseType: 'arraybuffer',
    })
    upstreamBuffer = fetchedImage.data
    upstreamType =
      detectContentType(upstreamBuffer) ||
      (fetchedImage.headers['Content-Type'] ?? '')
    maxAge = getMaxAge(fetchedImage.headers['Cache-Control'] ?? '')

    // get content type
    let contentType: string
    if (mimeType) {
      contentType = mimeType
    } else if (
      upstreamType?.startsWith('image/') &&
      getExtension(upstreamType) &&
      upstreamType !== WEBP &&
      upstreamType !== AVIF
    ) {
      contentType = upstreamType
    } else {
      contentType = JPEG
    }

    // optimize image
    let optimizedBuffer = await optimizeImage(
      upstreamBuffer,
      contentType,
      quality,
      width
    )

    if (optimizedBuffer) {
      const payload: ResponsePayload = {
        buffer: optimizedBuffer,
        contentType,
        maxAge: Math.max(maxAge, 2629746 * 1000),
        etag: getHash([optimizedBuffer]),
      }

      // write file to local storage
      await writeImageToFileSystem(
        cacheKey,
        contentType,
        payload.maxAge,
        payload.etag,
        payload.buffer
      )

      // response
      return sendResponse(payload, 'MISS')
    } else {
      throw error(500, 'unable to optimize image')
    }
  } catch (e) {
    throw error(500, 'unable to optimize image')
  }
}
