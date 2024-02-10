import type { Tag, TagType } from '@riffyh/commons'

export const filterTagByType = <T extends Omit<Tag, 'id' | 'name'>>(
  tags: T[],
  type: TagType
): T[] => {
  return tags.filter(tag => tag.type === type)
}
