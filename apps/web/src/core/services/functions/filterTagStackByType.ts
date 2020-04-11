import { IDatabaseTag, ITagType } from '../../@types'

export const filterTagStackByType = (
  tagStack: IDatabaseTag[],
  type: ITagType
): IDatabaseTag[] => {
  return tagStack.filter(tag => tag.name === type)
}
