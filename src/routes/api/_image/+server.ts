import { error } from '@sveltejs/kit'

import axios from 'axios'
import { AVIF, JPEG, WEBP } from '../../../core/constants/image/mimeTypes'

import { detectContentType } from '../../../core/services/image/detectContentType'
import { getCacheKey } from '../../../core/services/image/getCacheKey'
import { getExtension } from '../../../core/services/image/getExtension'
import { getHash } from '../../../core/services/image/getHash'
import { getMaxAge } from '../../../core/services/image/getMaxAge'
import { getSupportedMimeType } from '../../../core/services/image/getSupportedMimeType'
import { optimizeImage } from '../../../core/services/image/optimizeImage'
import { readImageFileSystem } from '../../../core/services/image/readImageFileSystem'
import { sendResponse } from '../../../core/services/image/sendResponse'
import { writeImageToFileSystem } from '../../../core/services/image/writeImageToFileSystem'

import type { RequestHandler } from './$types'
import type { ResponsePayload } from '../../../core/@types/image/ResponsePayload'

export const GET: RequestHandler = async event => {
  // get variables
  const url = event.url.searchParams.get('url') ?? ''
  const width = Number(event.url.searchParams.get('w') ?? '')
  const quality = Number(event.url.searchParams.get('q') ?? '')

  // get target file type to optimize
  const mimeType = getSupportedMimeType(
    /**
     * UNSTABLE
     * at the time of writing, AVIF is very CPU and memory intensive tasks. not recommended for production
     */
    ['image/webp' /* , 'image/avif' */],
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
    const upstreamBuffer = fetchedImage.data
    const upstreamType =
      detectContentType(upstreamBuffer) ||
      (fetchedImage.headers['Content-Type'] ?? '')
    const maxAge = getMaxAge(fetchedImage.headers['Cache-Control'] ?? '')

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

      // write file to local storage, not await since this is not prioritised
      writeImageToFileSystem(
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
