import { IHentai } from './IHentai'

export interface IFetchedRaw {
  status: string
  data: {
    id: number | string
    exclude: number[]
    raw: IHentai
  }
}
