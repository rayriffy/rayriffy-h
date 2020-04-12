import { Hentai } from './Hentai'

export interface SearchProps {
  raw: Hentai[]
  skip: number
  showOnEmptyQuery?: boolean
}
