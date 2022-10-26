import { Tag } from '../@types/Tag'
import { TagType } from '../@types/TagType'

export const filterTagByType = <T extends Omit<Tag, 'id' | 'name'>>(
  tags: T[],
  type: TagType
): T[] => {
  return tags.filter(tag => tag.type === type)
}
