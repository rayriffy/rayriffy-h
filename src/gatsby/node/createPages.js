const path = require('path')

const { itemsPerPage } = require('./constants/itemsPerPage')

const { hentaiListing } = require('./createPages/hentaiListing')
const { hentaiViewing } = require('./createPages/hentaiViewing')
const { search } = require('./createPages/search')
const { tagListing } = require('./createPages/tagListing')
const { tagViewing } = require('./createPages/tagViewing')

exports.createPages = async args => {
  const { actions } = args
  const { createPage } = actions

  hentaiListing(args)
  hentaiViewing(args)
  search(args)
  tagListing(args)
  tagViewing(args)

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
