import { Tag, TagType } from '@rayriffy-h/helper'

export const filterTagByType = (tags: Tag[], type: TagType): Tag[] => {
  return tags.filter(tag => tag.type === type)
}
