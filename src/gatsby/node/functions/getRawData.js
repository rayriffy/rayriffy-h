const _ = require('lodash')

const axios = require('axios')
const fs = require('fs')

/**
 * Featch raw data from cache or API
 * @param {number} pathPrefix   Tag path prefix
 * @param {array}  exclude      Exclude pages
 */
exports.getRawData = async (id, exclude, reporter) => {
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
      thumbnail: {
        t: 'j',
        w: 0,
        h: 0,
      },
    },
    scanlator: '',
    upload_date: 0,
    tags: [],
    num_pages: 0,
    num_favorites: 0,
  }

  try {
    // Read file from cache
    if (fs.existsSync('./.tmp/crawler.json')) {
      const reader = fs.readFileSync('./.tmp/crawler.json', 'utf8')
      const cache = JSON.parse(reader)

      // console.log(cache.length)

      const filter = _.head(_.filter(cache, o => o.data.id === id && o.status === 'success'))

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
        const out = await axios.get(`https://nh-express-git-master.rayriffy.now.sh/api/gallery/${id}`)

        return {
          status: 'success',
          data: {
            id,
            exclude,
            raw: out.data,
          },
        }
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
