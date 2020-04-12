import { Hentai } from '../../../../core/@types'

export interface Props {
  pageContext: {
    raw: Hentai[]
    page: {
      current: number
      max: number
    }
  }
}
