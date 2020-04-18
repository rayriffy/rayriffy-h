import { Hentai } from '@rayriffy-h/helper'

export interface FetchedRaw {
  status: string
  data: {
    hentai_id: number
    exclude: number[]
    raw: Hentai
  }
}
