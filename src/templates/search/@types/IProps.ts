import { IHentai } from '../../../core/@types'

export interface IProps {
  pageContext: {
    raw: IHentai[]
    skip: number
  }
}
