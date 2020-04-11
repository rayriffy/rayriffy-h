import { ITag } from '../../../../core/@types'

export interface IProps {
  pageContext: {
    prefix: string
    subtitle: string
    raw: ITag[]
  }
}
