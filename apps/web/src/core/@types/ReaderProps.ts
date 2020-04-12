import { FetchedRaw } from './FetchedRaw'

export interface ReaderProps {
  raw: FetchedRaw['data']
  internal?: boolean
}
