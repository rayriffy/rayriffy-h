import { GatsbyNode } from 'gatsby'
import path from 'path'

import { itemsPerPage } from './constants/itemsPerPage'

import { hentaiListing } from './createPages/hentaiListing'
import { hentaiViewing } from './createPages/hentaiViewing'
import { search } from './createPages/search'
import { tagListing } from './createPages/tagListing'
import { tagViewing } from './createPages/tagViewing'

export const createPages: GatsbyNode['createPages'] = async args => {
  const { actions } = args
  const { createPage } = actions

  hentaiListing(args)
  hentaiViewing(args)
  search(args)
  tagListing(args)
  tagViewing(args)

  // /**
  //  * Create collection page
  //  */
  createPage({
    path: `/collection`,
    component: path.resolve(`./src/templates/collection/components/index.tsx`),
    context: {
      skip: itemsPerPage,
    },
  })
}
