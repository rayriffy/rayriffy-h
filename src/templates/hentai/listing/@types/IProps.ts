import { IDatabaseTag } from '../../../../core/@types/IDatabaseTag'
import { IFetchedRaw } from '../../../../core/@types/IFetchedRaw'

export interface IProps {
  pageContext: {
    raw: IFetchedRaw[]
    page: {
      current: number
      max: number
    }
    tagStack: IDatabaseTag[]
  }
}