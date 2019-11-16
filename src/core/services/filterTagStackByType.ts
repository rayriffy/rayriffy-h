import { filter } from 'lodash'

import { IDatabaseTag } from '../@types/IDatabaseTag'
import { ITagType } from '../@types/ITagType'

export const filterTagStackByType = (tagStack: IDatabaseTag[], type: ITagType): IDatabaseTag[] => {
  return filter(tagStack, tag => tag.name === type)
}
