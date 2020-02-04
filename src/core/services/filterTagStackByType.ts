import { IDatabaseTag } from '../@types/IDatabaseTag'
import { ITagType } from '../@types/ITagType'

export const filterTagStackByType = (
  tagStack: IDatabaseTag[],
  type: ITagType
): IDatabaseTag[] => {
  return tagStack.filter(tag => tag.name === type)
}
