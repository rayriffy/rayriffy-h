import { Favorite } from './Favorite'

export interface CollectionStore {
  collection: {
    version: number
    data: Favorite[]
  }
}
