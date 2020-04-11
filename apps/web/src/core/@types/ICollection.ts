import { IFavorite } from './IFavorite'

export interface ICollection {
  version: number
  data: IFavorite[]
}
