import { FetchedRaw } from '../../../../core/@types/FetchedRaw'

export interface Props {
  pageContext: {
    raw: FetchedRaw['data']
  }
}
