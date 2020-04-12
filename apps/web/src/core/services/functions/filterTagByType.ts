import { Tag, TagType } from '../../@types'

export const filterTagByType = (tags: Tag[], type: TagType): Tag[] => {
  return tags.filter(tag => tag.type === type)
}
