import { Tag } from '../@types/Tag'
import { TagType } from '../@types/TagType'

export const filterTagByType = (tags: Tag[], type: TagType): Tag[] => {
  return tags.filter(tag => tag.type === type)
}
