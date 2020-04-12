import { FetchedRaw } from '../../../../core/@types'

export interface Props {
  pageContext: {
    raw: FetchedRaw['data']
  }
}
