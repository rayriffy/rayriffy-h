import { Cache, Reporter } from 'gatsby'
import { getHentai, rawHentaiToHentai } from '@rayriffy-h/helper'

import { FetchedRaw } from '../../../core/@types'

/**
 * Featch raw data from cache or API
 * @param {number} pathPrefix   Tag path prefix
 * @param {array}  exclude      Exclude pages
 */
export const getRawData = async (
  id: number,
  exclude: number[],
  { reporter, cache }: { cache: Cache['cache']; reporter: Reporter }
): Promise<FetchedRaw> => {
  try {
    // Read file from cache
    const cacheData = await cache.get('rayriffy-h-hentai-cache')
    const parsedCache: FetchedRaw[] = cacheData ? JSON.parse(cacheData) : []

    const isInCache = parsedCache.map(o => o.data.hentai_id).includes(id)

    if (isInCache) {
      const cacheRes = parsedCache.filter(o => o.data.hentai_id === id)[0]

      return {
        ...cacheRes,
        data: {
          ...cacheRes.data,
          exclude,
          raw: rawHentaiToHentai(cacheRes.data.raw),
        },
      }
    } else {
      const out = await getHentai(id)

      return {
        status: 'success',
        data: {
          hentai_id: Number(id),
          exclude,
          raw: out,
        },
      }
    }
  } catch (err) {
    reporter.warn(`cannot process ${id} with code ${err.code}`)

    return {
      status: 'failure',
      data: {
        hentai_id: 0,
        exclude: [],
        raw: rawHentaiToHentai({
          id: 0,
          media_id: '0',
          title: {
            english: '',
            japanese: '',
            pretty: '',
          },
          images: {
            cover: {
              t: 'j',
              w: 0,
              h: 0,
            },
            pages: [],
          },
          tags: [],
        }),
      },
    }
  }
}
