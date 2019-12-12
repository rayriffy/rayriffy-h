import filter from 'lodash.filter'

import { ITag } from '../@types/ITag'
import { ITagType } from '../@types/ITagType'

export const filterTagByType = (tags: ITag[], type: ITagType): ITag[] => {
  return filter(tags, tag => tag.type === type)
}
