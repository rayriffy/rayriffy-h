const _ = require('lodash')

/**
 * Filter hentai by tag ID
 */

exports.filterHentaiByTag = (healthyResults, tag) => {
  const qualifiedResults = []

  healthyResults.map(node => {
    if (node) {
      if (!_.isEmpty(_.filter(node.data.raw.tags, o => o.id === tag.id))) { qualifiedResults.push(node) }
    }
  })

  return qualifiedResults
}
