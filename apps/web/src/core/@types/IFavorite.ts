import { IHentai } from './IHentai'

export interface IFavorite {
  id: number | string
  internal: boolean
  data: IHentai
}
