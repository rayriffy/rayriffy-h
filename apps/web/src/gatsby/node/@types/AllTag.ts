import { DatabaseTag } from '../../../core/@types'

export interface AllTag {
  allTag: {
    edges: {
      node: DatabaseTag
    }[]
  }
}
