import { ITag } from '../../../../core/@types/ITag'

export interface IProps {
  pageContext: {
    prefix: string
    subtitle: string
    raw: ITag[]
  }
}
