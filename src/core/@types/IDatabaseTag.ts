import { ITagType } from './ITagType'

export interface IDatabaseTag 
{
  color: {
    border: string
    background: string
    text: string
  },
  name: ITagType
  prefix: string
}
