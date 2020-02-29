import { IHentai } from '../../../../core/@types/IHentai'
import { ITag } from '../../../../core/@types/ITag'

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
