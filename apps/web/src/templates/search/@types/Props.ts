import { Hentai } from '../../../core/@types'

export interface Props {
  pageContext: {
    raw: Hentai[]
    skip: number
  }
}
