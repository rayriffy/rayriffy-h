const { filter } = require('lodash')

const { getData } = require('./functions/getData.js')
const { tags } = require('../../contents/database/tags')

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
  cache,
  reporter,
}) => {
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

  // Add all healthy results into Gatsby Node
  healthyResults.map(hentai => {
    const hentaiData = hentai.data

    const nodeMeta = {
      id: createNodeId(`hentai-${hentai.data.hentai_id}`),
      parent: null,
      children: [],
      internal: {
        type: 'hentai',
        content: JSON.stringify(hentai.data),
        contentDigest: createContentDigest(hentai.data),
      },
    }

    const node = Object.assign({}, hentaiData, nodeMeta)
    actions.createNode(node)
  })

  // Add all tag type to Gatsby Node
  fetchedData.tags.map(tag => {
    const nodeMeta = {
      id: createNodeId(`tag-${tag.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'tag',
        content: JSON.stringify(tag),
        contentDigest: createContentDigest(tag),
      },
    }

    const node = Object.assign({}, tag, nodeMeta)
    actions.createNode(node)
  })

  /**
   * Put all healthy results into cache
   */
  await cache.set(`rayriffy-h-hentai-cache`, JSON.stringify(healthyResults))
}
