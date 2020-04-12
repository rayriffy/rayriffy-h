import { DatabaseTag, TagType } from '../../@types'

export const filterTagStackByType = (
  tagStack: DatabaseTag[],
  type: TagType
): DatabaseTag[] => {
  return tagStack.filter(tag => tag.name === type)
}
