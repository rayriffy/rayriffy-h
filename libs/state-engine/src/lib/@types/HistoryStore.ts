import { Hentai } from '@rayriffy-h/helper'

export interface HistoryItem {
  internal: boolean
  data: Hentai
}

export interface HistoryStore {
  history: {
    version: number
    items: HistoryItem[]
  }
}
