import _ from 'lodash'

import { IFetchedRaw } from '../../core/@types/IFetchedRaw'
import { ITag } from '../../core/@types/ITag'
import { ITagType } from '../../core/@types/ITagType'

/**
 * Filter only tags object with specified types
 * @param {object} nodes  healthyTags
 * @param {string} type   Tag type
 */
export const tagFilter = (nodes: IFetchedRaw[], type: ITagType) => {
  const res: ITag[] = []

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
