import { Hentai } from '@rayriffy-h/helper'

export interface HistoryItem {
  data: Hentai
}

export interface HistoryStore {
  history: {
    version: number
    items: HistoryItem[]
  }
}
