const _ = require('lodash')

/**
 * Filter only tags object with specified types
 * @param {object} nodes All fetched object
 * @param {string} type Type of tag
 */

exports.filterTag = (nodes, type) => {
  const res = []

  nodes.map(node => {
    node.data.raw.tags.map(tag => {
      if (tag.type === type) {
        if (_.isEmpty(_.filter(res, o => o.id === tag.id))) {
          res.push(tag)
        }
      }
    })
  })

  return res
}
