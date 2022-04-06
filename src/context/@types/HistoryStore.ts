import { Hentai } from '../../core/@types/Hentai'

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
