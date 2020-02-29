const { chunk } = require('lodash')

const path = require('path')

const { filterHentaiByTag } = require('./functions/filterHentaiByTag')
const { filterTag } = require('./functions/filterTag')

const { itemsPerPage } = require('./constants/itemsPerPage')

const { hentaiListing } = require('./createPages/hentaiListing')
const { hentaiViewing } = require('./createPages/hentaiViewing')

exports.createPages = async (args) => {
  const { actions, reporter, graphql } = args
  const { createPage } = actions
  
  hentaiListing(args)
  hentaiViewing(args)

  // /**
  //  * Create hentai listing pages for each tags
  //  * @param {string} pathPrefix   Tag path prefix
  //  * @param {object} nodes  Filtered tag object
  //  * @param {string} name        Tag name
  //  */
  // const createSlugPages = (pathPrefix, name, tags) => {
  //   tags.map(tag => {
  //     const qualifiedResults = filterHentaiByTag(healthyResults, tag)

  //     const qualifiedResultChunks = chunk(qualifiedResults, itemsPerPage)

  //     qualifiedResultChunks.map((chunk, i) => {
  //       createPage({
  //         path:
  //           i === 0
  //             ? `/${pathPrefix}/${tag.id}`
  //             : `${pathPrefix}/${tag.id}/p/${i + 1}`,
  //         component: path.resolve(
  //           `./src/templates/tag/viewing/components/index.tsx`
  //         ),
  //         context: {
  //           subtitle: `${name}/${tag.name}`,
  //           raw: chunk,
  //           page: {
  //             current: i + 1,
  //             max: qualifiedResultChunks.length,
  //           },
  //           prefix: pathPrefix,
  //           tag: tag,
  //         },
  //       })
  //     })
  //   })
  // }

  // /**
  //  * Creating tag listing and pages recursively
  //  */
  // tagStack.map(tag => {
  //   // Find all possible tags
  //   const nodes = filterTag(healthyResults, tag.name)

  //   // Create hentai listings by tag
  //   createSlugPages(tag.prefix, tag.name, nodes)

  //   createPage({
  //     path: `/${tag.prefix}`,
  //     component: path.resolve(
  //       `./src/templates/tag/listing/components/index.tsx`
  //     ),
  //     context: {
  //       prefix: tag.prefix,
  //       subtitle: `${tag.name}`,
  //       raw: nodes,
  //     },
  //   })
  // })

  // /**
  //  * Create search page
  //  */
  // createPage({
  //   path: `/search`,
  //   component: path.resolve(`./src/templates/search/components/index.tsx`),
  //   context: {
  //     raw: healthyResults.map(o => ({
  //       ...o.data.raw,
  //       images: {
  //         ...o.data.raw.images,
  //         pages: [],
  //       },
  //     })),
  //     skip: itemsPerPage,
  //   },
  // })

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
}
