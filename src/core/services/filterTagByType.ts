import { ITag } from '../@types/ITag'
import { ITagType } from '../@types/ITagType'

export const filterTagByType = (tags: ITag[], type: ITagType): ITag[] => {
  return tags.filter(tag => tag.type === type)
}
