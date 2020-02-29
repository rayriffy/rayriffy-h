import { IHentai } from './IHentai'

export interface IFetchedRaw {
  status: string
  data: {
    hentai_id: number
    exclude: number[]
    raw: IHentai
  }
}
