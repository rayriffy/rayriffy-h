const fetch = require('isomorphic-unfetch')

const rawTranformer = data => ({
  id: Number(data.id),
  media_id: data.media_id,
  title: data.title,
  images: {
    cover: {
      h: data.images.cover.h,
      t: data.images.cover.t,
      w: data.images.cover.w,
    },
    pages: data.images.pages.map(o => ({
      h: o.h,
      t: o.t,
      w: o.w,
    })),
  },
  tags: data.tags.map(o => ({
    id: o.id,
    name: o.name,
    type: o.type,
  })),
})

/**
 * Featch raw data from cache or API
 * @param {number} pathPrefix   Tag path prefix
 * @param {array}  exclude      Exclude pages
 */
exports.getRawData = async (id, exclude, { reporter, cache }) => {
  try {
    // Read file from cache
    const cacheData = await cache.get('rayriffy-h-hentai-cache')
    const parsedCache = cacheData ? JSON.parse(cacheData) : []

    const isInCache = parsedCache.map(o => o.data.hentai_id).includes(id)

    if (isInCache) {
      const cacheRes = parsedCache.filter(o => o.data.hentai_id === id)[0]

      return {
        ...cacheRes,
        data: {
          ...cacheRes.data,
          raw: rawTranformer(cacheRes.data.raw),
        },
      }
    } else {
      const out = await fetch(
        `https://h.api.rayriffy.com/v1/gallery/${id}`
      ).then(raw => raw.json())

      return {
        status: 'success',
        data: {
          hentai_id: Number(id),
          exclude,
          raw: rawTranformer(out.response.data),
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
        raw: rawTranformer({
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
        }),
      },
    }
  }
}
