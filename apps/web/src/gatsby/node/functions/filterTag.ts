import { filter, isEmpty } from 'lodash'

import { Hentai, Tag, TagType } from '@rayriffy-h/helper'

/**
 * Filter only tags object with specified types
 * @param {object} nodes All fetched object
 * @param {string} type Type of tag
 */

export const filterTag = (nodes: Hentai[], type: TagType): Tag[] => {
  const res: Tag[] = []

  nodes.map(node => {
    return node.tags.map(tag => {
      if (tag.type === type) {
        if (isEmpty(filter(res, o => o.id === tag.id))) {
          return res.push(tag)
        }
      }
      return null
    })
  })

  return res
}
