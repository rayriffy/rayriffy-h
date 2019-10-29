const _ = require('lodash')

const axios = require('axios')
const fs = require('fs')
const path = require('path')

const databaseTags = require('./src/contents/database/tags')

const {filterHentaiByTag} = require('./functions/filterHentaiByTag')
const {filterTag} = require('./functions/filterTag')
const {getData} = require('./functions/getData')

const ITEMS_PER_PAGE = 20

const PREFETCH_GIST = 'https://gist.githubusercontent.com/rayriffy/09554279046d2fda29c125e0a16dc695/raw/crawler.json'

/**
 * Handler function for file sync
 * @param {err} id Error information
 */
const fshandler = err => {
  if (err) {
    throw err
  }
}

exports.onPreBootstrap = async ({reporter}) => {
  // Download file from cache if cache does not exist
  if (!fs.existsSync(`./.tmp/crawler.json`)) {
    reporter.info(`Downloading prefetched data from GitHub Gist`)
    const gistCache = await axios.get(PREFETCH_GIST)

    if (!fs.existsSync(`./.tmp`)) {
      fs.mkdirSync(`./.tmp`)
    }

    await fs.writeFile(`./.tmp/crawler.json`, JSON.stringify(gistCache.data), fshandler)
    reporter.info(`Downloaded!`)
  } else {
    reporter.info(`Found cache! Skipping prefetch stage`)
  }
}

exports.createPages = async ({actions, reporter}) => {
  const {createPage} = actions

  // Begin to fetch data
  const fetchedData = {
    tags: databaseTags,
    codes: await getData({reporter}),
  }

  /**
   * Filter errors and assign constants
   */
  const healthyResults = _.filter(fetchedData.codes, o => o.status === 'success').reverse()

  const tagStack = fetchedData.tags

  /**
   * Create listing page
   */
  const hentaiListingChunks = _.chunk(healthyResults, ITEMS_PER_PAGE)

  hentaiListingChunks.map((chunk, i) => {
    createPage({
      path: i === 0 ? `/` : `/p/${i + 1}`,
      component: path.resolve(`./src/templates/hentai/listing/components/index.tsx`),
      context: {
        subtitle: `listing`,
        raw: chunk,
        page: {
          current: i + 1,
          max: hentaiListingChunks.length,
        },
      },
    })
  })

  /**
   * Create gallery pages
   */
  healthyResults.map(node => {
    createPage({
      path: `/r/${node.data.id}`,
      component: path.resolve(`./src/templates/hentai/viewing/components/index.tsx`),
      context: {
        raw: node,
      },
    })
  })

  /**
   * Create hentai listing pages for each tags
   * @param {string} pathPrefix   Tag path prefix
   * @param {object} nodes  Filtered tag object
   * @param {string} name        Tag name
   */
  const createSlugPages = (pathPrefix, name, tags) => {
    tags.map(tag => {
      const qualifiedResults = filterHentaiByTag(healthyResults, tag)

      const qualifiedResultChunks = _.chunk(qualifiedResults, ITEMS_PER_PAGE)

      qualifiedResultChunks.map((chunk, i) => {
        createPage({
          path: i === 0 ? `/${pathPrefix}/${tag.id}` : `${pathPrefix}/${tag.id}/p/${i + 1}`,
          component: path.resolve(`./src/templates/tag/viewing/components/index.tsx`),
          context: {
            subtitle: `${name}/${tag.name}`,
            raw: chunk,
            page: {
              current: i + 1,
              max: qualifiedResultChunks.length,
            },
            prefix: pathPrefix,
            tag: tag,
          },
        })
      })
    })
  }

  /**
   * Creating tag listing and pages recursively
   */
  tagStack.map(tag => {
    // Find all possible tags
    const nodes = filterTag(healthyResults, tag.name)

    // Create hentai listings by tag
    createSlugPages(tag.prefix, tag.name, nodes)

    createPage({
      path: `/${tag.prefix}`,
      component: path.resolve(`./src/templates/tag/listing/components/index.tsx`),
      context: {
        prefix: tag.prefix,
        subtitle: `${tag.name}`,
        raw: nodes,
      },
    })
  })

  /**
   * Create search page
   */
  createPage({
    path: `/search`,
    component: path.resolve(`./src/templates/search/components/index.tsx`),
    context: {
      raw: hentaiListingChunks,
      skip: ITEMS_PER_PAGE,
    },
  })

  /**
   * Put all healthy results into cache
   */
  fs.writeFile(`./.tmp/crawler.json`, JSON.stringify(healthyResults), fshandler)
}

exports.onPostBootstrap = async ({reporter}) => {
  reporter.info('Generating API')

  try {
    /**
     * Get healthy raw data
     */
    const fetchedRaw = await getData({reporter})

    const healthyResults = _.filter(fetchedRaw, o => o.status === 'success').reverse()

    /**
     * Preparing to generate API
     */
    const apiPath = 'api'
    const apiChunks = _.chunk(healthyResults, ITEMS_PER_PAGE)

    if (!fs.existsSync(`./public/${apiPath}`)) {
      fs.mkdirSync(`./public/${apiPath}`)
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
            length: apiChunks.length,
          },
        },
      }),
      fshandler
    )

    /**
     * Generate API listing pages
     */
    if (!fs.existsSync(`./public/${apiPath}/listing`)) {
      fs.mkdirSync(`./public/${apiPath}/listing`)
    }

    apiChunks.map((chunk, i) => {
      const out = {
        status: 'success',
        code: 201,
        data: [],
      }

      chunk.map(node => {
        if (node) {
          out.data.push(node.data.raw)
        }
      })

      fs.writeFile(`./public/${apiPath}/listing/${i + 1}.json`, JSON.stringify(out), fshandler)
    })

    /**
     * Generate tag listing API
     */

    databaseTags.map(tag => {
      const nodes = filterTag(healthyResults, tag.name)

      fs.writeFile(
        `./public/${apiPath}/${tag.prefix}.json`,
        JSON.stringify({
          status: 'success',
          code: 201,
          data: nodes.map(node => ({
            id: node.id,
            name: node.name,
          })),
        }),
        fshandler
      )
    })

    /**
     * Generate tag viewing API
     */

    databaseTags.map(tag => {
      if (!fs.existsSync(`./public/${apiPath}/${tag.prefix}`)) {
        fs.mkdirSync(`./public/${apiPath}/${tag.prefix}`)
      }

      const nodes = filterTag(healthyResults, tag.name)

      nodes.map(node => {
        if (!fs.existsSync(`./public/${apiPath}/${tag.prefix}/${node.id}`)) {
          fs.mkdirSync(`./public/${apiPath}/${tag.prefix}/${node.id}`)
        }

        const filteredHentai = filterHentaiByTag(healthyResults, node)

        const apiChunks = _.chunk(filteredHentai, ITEMS_PER_PAGE)

        apiChunks.map((chunk, i) => {
          const out = {
            status: 'success',
            code: 201,
            data: [],
          }

          chunk.map(node => {
            if (node) {
              out.data.push(node.data.raw)
            }
          })

          fs.writeFile(`./public/${apiPath}/${tag.prefix}/${node.id}/${i + 1}.json`, JSON.stringify(out), fshandler)
        })
      })
    })

    reporter.info('API generated')
  } catch (e) {
    reporter.warn('Unable to generate API')
    throw e
  }
}
