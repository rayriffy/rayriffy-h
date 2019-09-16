const _ = require('lodash')

const axios = require('lodash')
const {TaskQueue} = require('cwait')
const fs = require('fs')
const path = require('path')

const databaseCodes = require('./contents/database/codes')
const databaseTags = require('./contents/database/tags')

const MAX_SIMULTANEOUS_DOWNLOADS = 3
const PREFETCH_GIST = 'https://gist.githubusercontent.com/rayriffy/09554279046d2fda29c125e0a16dc695/raw/crawler.json'

exports.createPages = async ({actions, reporter}) => {
  const {createPage} = actions

  /**
   * Handler function for file sync
   * @param {err} id Error information
   */
  const fshandler = err => {
    if (err) {
      reporter.log(err)
      throw err
    }
  }

  // Download file from cache if cache does not exist
  if (!fs.existsSync(`./.tmp/crawler.json`)) {
    reporter.info(`Downloading prefetched data from GitHub Gist`)
    const gistCache = await axios.get(PREFETCH_GIST)

    if (!fs.existsSync(`./.tmp`)) {
      fs.mkdirSync(`./.tmp`)
    }

    await fs.writeFile(`./.tmp/crawler.json`, JSON.stringify(gistCache.data), fshandler)
  } else {
    reporter.info(`Found cache! Skipping prefetch stage`)
  }

  /**
   * Featch raw data from cache or API
   * @param {number} pathPrefix   Tag path prefix
   * @param {array}  exclude      Exclude pages
   */
  const getRawData = async (id, exclude) => {
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

  // Begin to fetch data
  const queue = new TaskQueue(Promise, MAX_SIMULTANEOUS_DOWNLOADS)
  const fetchedData = {
    tags: databaseTags,
    codes: await Promise.all(
      databaseCodes.map(queue.wrap(async item => await getRawData(item.code ? item.code : item, item.exclude ? item.exclude : [], reporter))),
    ),
  }

  /**
   * Filter errors and assign constants
   */
  const healthyResults = _.filter(fetchedData.codes, o => o.status === 'success')

  const tagStack = fetchedData.tags

  /**
   * Create listing page
   */
  createPage({
    path: `listing`,
    component: path.resolve(`./src/templates/hentai/listing/components/index.tsx`),
    context: {
      subtitle: `listing`,
      raw: healthyResults.reverse(),
    },
  })

  /**
   * Create gallery pages
   */
  const postPrefix = 'r'
  _.each(healthyResults, node => {
    createPage({
      path: `${postPrefix}/${node.data.id}`,
      component: path.resolve(`./src/templates/hentai/viewing/components/index.tsx`),
      context: {
        id: node.data.id,
        raw: node.data.raw,
        exclude: node.data.exclude,
      },
    })
  })

  /**
   * Create hentai listing pages for each tags
   * @param {string} pathPrefix   Tag path prefix
   * @param {object} nodes  Filtered tag object
   * @param {string} name        Tag name
   */
  const createSlugPages = (pathPrefix, name, nodes) => {
    _.each(nodes, tag => {
      const qualifiedResults = []

      _.each(healthyResults, node => {
        if (node) {
          if (!_.isEmpty(_.filter(node.data.raw.tags, o => o.id === tag.id))) { qualifiedResults.push(node) }
        }
      })

      createPage({
        path: `${pathPrefix}/${tag.id}`,
        component: path.resolve(`./src/templates/tag/viewing/components/index.tsx`),
        context: {
          subtitle: `${name}/${tag.name}`,
          raw: qualifiedResults,
          tagStack,
        },
      })
    })
  }

  /**
   * Filter only tags object with specified types
   * @param {object} nodes All fetched object
   * @param {string} type Type of tag
   */
  const tagFilter = (nodes, type) => {
    const res = []
  
    _.each(nodes, node => {
      _.each(node.data.raw.tags, tag => {
        if (tag.type === type) {
          if (_.isEmpty(_.filter(res, o => o.id === tag.id))) {
            res.push(tag)
          }
        }
      })
    })
  
    return res
  }

  /**
   * Creating tag listing and pages recursively
   */
  _.each(tagStack, node => {
    // Find all possible tags
    const nodes = tagFilter(healthyResults, node.name)

    // Create hentai listings by tag
    createSlugPages(node.prefix, node.name, nodes)

    createPage({
      path: `${node.prefix}`,
      component: path.resolve(`./src/templates/tag/listing/components/index.tsx`),
      context: {
        prefix: node.prefix,
        subtitle: `${node.name}`,
        raw: nodes,
      },
    })
  })

  /**
   * Put all healthy results into cache
   */
  fs.writeFile(`./.tmp/crawler.json`, JSON.stringify(healthyResults), fshandler)

  /**
   * Preparing to generate API
   */
  const apiPath = 'api'
  const chunks = _.chunk(healthyResults, 10)

  if (!fs.existsSync(`./public/api`)) {
    fs.mkdirSync(`./public/api`)
  }
  if (!fs.existsSync(`./public/api/list`)) {
    fs.mkdirSync(`./public/api/list`)
  }

  /**
   * Generate API status page
   */
  fs.writeFile(
    `./public/${apiPath}/status.json`,
    JSON.stringify({
      status: 'success',
      code: 201,
      data: {
        time: Date.now(),
        list: {
          length: chunks.length,
        },
      },
    }),
    fshandler,
  )

  /**
   * Generate API listing pages
   */
  _.each(chunks, (chunk, i) => {
    const out = {
      status: 'success',
      code: 201,
      data: [],
    }
    _.each(chunk, node => {
      if (node) {
        out.data.push(node.data.raw)
      }
    })
    fs.writeFile(`./public/${apiPath}/list/${i + 1}.json`, JSON.stringify(out), fshandler)
  })
}

/**
 * Generate page from dynamic URLs that match RegExp
 */
exports.onCreatePage = async ({page, actions}) => {
  const {createPage} = actions

  if (page.path.match(/^\/g/)) {
    page.matchPath = '/g/*'
    createPage(page)
  }
}

exports.onCreateWebpackConfig = ({ actions, stage }) => {
  if (!stage.startsWith('develop')) {
    actions.setWebpackConfig({
      resolve: {
        alias: {
          react: `preact/compat`,
          "react-dom": `preact/compat`,
          "react-dom/server": `preact/compat`,
        },
      },
    })
  }
}
