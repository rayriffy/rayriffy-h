import { DatabaseTag } from '../../../core/@types/DatabaseTag'

export interface AllTag {
  allTag: {
    edges: {
      node: DatabaseTag
    }[]
  }
}
