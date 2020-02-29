import { IHentai } from '../../../../core/@types/IHentai'

export interface IProps {
  pageContext: {
    raw: IHentai[]
    page: {
      current: number
      max: number
    }
  }
}
