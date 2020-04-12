import { Hentai } from './Hentai'

export interface FetchedRaw {
  status: string
  data: {
    hentai_id: number
    exclude: number[]
    raw: Hentai
  }
}
