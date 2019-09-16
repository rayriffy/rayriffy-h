import { IDatabaseTag } from './IDatabaseTag'
import { IHentai } from './IHentai'

export interface IPosterProps {
  raw: IHentai
  tagStack: IDatabaseTag[]
}
