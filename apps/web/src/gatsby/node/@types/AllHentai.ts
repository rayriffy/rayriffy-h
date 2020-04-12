import { FetchedRaw } from '../../../core/@types'

export interface AllHentai {
  allHentai: {
    edges: {
      node: FetchedRaw['data']
    }[]
  }
}
