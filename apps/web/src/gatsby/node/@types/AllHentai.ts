import { FetchedRaw } from '../../../core/@types/FetchedRaw'

export interface AllHentai {
  allHentai: {
    edges: {
      node: FetchedRaw['data']
    }[]
  }
}
