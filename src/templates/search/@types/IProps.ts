import { IHentai } from '../../../core/@types/IHentai'

export interface IProps {
  pageContext: {
    raw: IHentai[]
    skip: number
  }
}
