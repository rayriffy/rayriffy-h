import { IHentai, ITag } from '../../../../core/@types'

export interface IProps {
  pageContext: {
    raw: IHentai[]
    page: {
      current: number
      max: number
    }
    prefix: string
    tag: ITag
    subtitle: string
  }
}
