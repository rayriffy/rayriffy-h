import { IHentai } from './IHentai'

export interface IFetchedRaw {
  status: string
  data: {
    id: number
    exclude: number[]
    raw: IHentai
  }
}
