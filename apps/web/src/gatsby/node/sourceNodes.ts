import { GatsbyNode, NodeInput, SourceNodesArgs } from 'gatsby'
import { filter } from 'lodash'

import { tags } from '../../contents/database/tags'
import { getData } from './functions'

export const sourceNodes: GatsbyNode['sourceNodes'] = async ({
  actions,
  createNodeId,
  createContentDigest,
  cache,
  reporter,
}: SourceNodesArgs) => {
  // Begin to fetch data
  const fetchedData = {
    tags,
    codes: await getData({ reporter, cache }),
  }

  /**
   * Filter errors and assign constants
   */
  const healthyResults = filter(
    fetchedData.codes,
    o => o.status === 'success'
  ).reverse()

  // Add all healthy results into Gatsby Node
  healthyResults.map(hentai => {
    const hentaiData = hentai.data

    if (hentai.data.hentai_id === 105034) {
      console.log(hentai.data.exclude)
    }

    const nodeMeta = {
      id: createNodeId(`hentai-${hentai.data.hentai_id}`),
      children: [],
      internal: {
        type: 'Hentai',
        content: JSON.stringify(hentai.data),
        contentDigest: createContentDigest(hentai.data),
      },
    }

    const node: NodeInput = Object.assign({}, hentaiData, nodeMeta)
    
    return actions.createNode(node)
  })

  // Add all tag type to Gatsby Node
  fetchedData.tags.map(tag => {
    const nodeMeta = {
      id: createNodeId(`tag-${tag.name}`),
      children: [],
      internal: {
        type: 'Tag',
        content: JSON.stringify(tag),
        contentDigest: createContentDigest(tag),
      },
    }

    const node: NodeInput = Object.assign({}, tag, nodeMeta)
    
    return actions.createNode(node)
  })

  /**
   * Put all healthy results into cache
   */
  await cache.set(`rayriffy-h-hentai-cache`, JSON.stringify(healthyResults))
}
