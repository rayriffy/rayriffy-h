import { filter, isEmpty } from 'lodash'

import { IHentai, ITag, ITagType } from '../../../core/@types'

/**
 * Filter only tags object with specified types
 * @param {object} nodes All fetched object
 * @param {string} type Type of tag
 */

export const filterTag = (nodes: IHentai[], type: ITagType): ITag[] => {
  const res: ITag[] = []

  nodes.map(node => {
    node.tags.map(tag => {
      if (tag.type === type) {
        if (isEmpty(filter(res, o => o.id === tag.id))) {
          res.push(tag)
        }
      }
    })
  })

  return res
}
