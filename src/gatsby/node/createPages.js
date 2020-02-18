const { filter, chunk } = require('lodash')

const path = require('path')
const fetch = require('isomorphic-unfetch')

const { tags } = require('../../contents/database/tags')

const { filterHentaiByTag } = require('./functions/filterHentaiByTag')
const { filterTag } = require('./functions/filterTag')
const { getData } = require('./functions/getData')

const { itemsPerPage } = require('./constants/itemsPerPage')

const PREFETCH_GIST =
  'https://gist.githubusercontent.com/rayriffy/09554279046d2fda29c125e0a16dc695/raw/crawler.json'

exports.createPages = async ({ actions, reporter, cache }) => {
  const { createPage } = actions

  // Download file from cache if cache does not exist
  const cacheData = await cache.get('rayriffy-h-hentai-cache')

  if (cacheData === undefined) {
    reporter.info(`Downloading prefetched data from GitHub Gist`)
    const gistCache = await fetch(PREFETCH_GIST).then(raw => raw.json())

    await cache.set(`rayriffy-h-hentai-cache`, JSON.stringify(gistCache))
    reporter.info(`Downloaded!`)
  } else {
    reporter.info(`Found cache! Skipping prefetch stage`)
  }

  // Begin to fetch data
  const fetchedData = {
    tags: tags,
    codes: await getData({ reporter, cache }),
  }

  /**
   * Filter errors and assign constants
   */
  const healthyResults = filter(
    fetchedData.codes,
    o => o.status === 'success'
  ).reverse()

  const tagStack = fetchedData.tags

  /**
   * Create listing page
   */
  const hentaiListingChunks = chunk(healthyResults, itemsPerPage)

  hentaiListingChunks.map((chunk, i) => {
    createPage({
      path: i === 0 ? `/` : `/p/${i + 1}`,
      component: path.resolve(
        `./src/templates/hentai/listing/components/index.tsx`
      ),
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
      component: path.resolve(
        `./src/templates/hentai/viewing/components/index.tsx`
      ),
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

      const qualifiedResultChunks = chunk(qualifiedResults, itemsPerPage)

      qualifiedResultChunks.map((chunk, i) => {
        createPage({
          path:
            i === 0
              ? `/${pathPrefix}/${tag.id}`
              : `${pathPrefix}/${tag.id}/p/${i + 1}`,
          component: path.resolve(
            `./src/templates/tag/viewing/components/index.tsx`
          ),
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
      component: path.resolve(
        `./src/templates/tag/listing/components/index.tsx`
      ),
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
      raw: healthyResults,
      skip: itemsPerPage,
    },
  })

  /**
   * Create about page
   */
  createPage({
    path: `/about`,
    component: path.resolve(`./src/templates/about/components/index.tsx`),
  })

  /**
   * Create collection page
   */
  createPage({
    path: `/collection`,
    component: path.resolve(`./src/templates/collection/components/index.tsx`),
    context: {
      skip: itemsPerPage,
    },
  })

  /**
   * Put all healthy results into cache
   */
  await cache.set(`rayriffy-h-hentai-cache`, JSON.stringify(healthyResults))
}
