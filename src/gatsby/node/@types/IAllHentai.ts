import { IFetchedRaw } from '../../../core/@types'

export interface IAllHentai {
  allHentai: {
    edges: {
      node: IFetchedRaw['data']
    }[]
  }
}
