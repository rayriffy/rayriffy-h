import { IDatabaseTag } from '../../../core/@types'

export interface IAllTag {
  allTag: {
    edges: {
      node: IDatabaseTag
    }[]
  }
}
