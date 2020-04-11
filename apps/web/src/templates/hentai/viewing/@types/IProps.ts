import { IFetchedRaw } from '../../../../core/@types'

export interface IProps {
  pageContext: {
    raw: IFetchedRaw['data']
  }
}
