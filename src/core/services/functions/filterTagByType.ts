import { ITag, ITagType } from '../../@types'

export const filterTagByType = (tags: ITag[], type: ITagType): ITag[] => {
  return tags.filter(tag => tag.type === type)
}
