import { Favorite } from './Favorite'

export interface Collection {
  version: number
  data: Favorite[]
}
