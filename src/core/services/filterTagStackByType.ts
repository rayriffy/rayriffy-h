import _ from 'lodash'

import { IDatabaseTag } from '../@types/IDatabaseTag'
import { ITagType } from '../@types/ITagType'

export const filterTagStackByType = (tagStack: IDatabaseTag[], type: ITagType): IDatabaseTag[] => {
  return _.filter(tagStack, tag => tag.name === type)
}
