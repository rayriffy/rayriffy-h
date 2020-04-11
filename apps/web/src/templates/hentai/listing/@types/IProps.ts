import { IHentai } from '../../../../core/@types'

export interface IProps {
  pageContext: {
    raw: IHentai[]
    page: {
      current: number
      max: number
    }
  }
}
