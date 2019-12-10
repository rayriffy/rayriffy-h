const _ = require('lodash')

const axios = require('axios')

/**
 * Featch raw data from cache or API
 * @param {number} pathPrefix   Tag path prefix
 * @param {array}  exclude      Exclude pages
 */
exports.getRawData = async (id, exclude, {reporter, cache}) => {
  const mockRaw = {
    id: 0,
    media_id: 0,
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
  }

  try {
    // Read file from cache
    const cacheData = await cache.get('rayriffy-h-hentai-cache')
    const parsedCache = cacheData ? JSON.parse(cacheData) : []

    const filter = _.head(_.filter(parsedCache, o => o.data.id === id && o.status === 'success'))

    if (!_.isEmpty(filter)) {
      if (filter) {
        return {
          ...filter,
          data: {
            ...filter.data,
            exclude,
          },
        }
      } else {
        return {
          status: 'failure',
          data: {
            id,
            exclude: [],
            raw: mockRaw,
          },
        }
      }
    } else {
      // Using reverse proxy server to avoid CORS issue
      const out = await axios.get(`https://opener.now.sh/api/data/${id}`)

      return {
        status: 'success',
        data: {
          id,
          exclude,
          raw: {
            id: out.data.id,
            media_id: out.data.media_id,
            title: out.data.title,
            images: {
              cover: {
                h: out.data.images.cover.h,
                t: out.data.images.cover.t,
                w: out.data.images.cover.w,
              },
              pages: out.data.images.pages.map(o => ({
                h: o.h,
                t: o.t,
                w: o.w,
              })),
            },
            tags: out.data.tags,
          },
        },
      }
    }
  } catch (err) {
    reporter.warn(`cannot process ${id} with code ${err.code}`)
    return {
      status: 'failure',
      data: {
        id,
        exclude: [],
        raw: mockRaw,
      },
    }
  }
}
