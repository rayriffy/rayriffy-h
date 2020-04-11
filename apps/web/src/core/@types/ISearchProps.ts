import { IHentai } from './IHentai'

export interface ISearchProps {
  raw: IHentai[]
  skip: number
  showOnEmptyQuery?: boolean
}
