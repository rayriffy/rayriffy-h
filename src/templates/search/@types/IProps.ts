import { IFetchedRaw } from '../../../core/@types/IFetchedRaw'

export interface IProps {
  pageContext: {
    raw: IFetchedRaw[]
    skip: number
  }
}
