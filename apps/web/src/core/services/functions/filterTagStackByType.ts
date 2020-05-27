import { TagType } from '@rayriffy-h/helper'
import { DatabaseTag } from '../../@types/DatabaseTag'

export const filterTagStackByType = (
  tagStack: DatabaseTag[],
  type: TagType
): DatabaseTag[] => {
  return tagStack.filter(tag => tag.name === type)
}
