import { IFetchedRaw } from './IFetchedRaw'

export interface IReaderProps {
  raw: IFetchedRaw['data']
  internal?: boolean
}
