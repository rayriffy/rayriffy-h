import { Hentai, Tag } from '../../../../core/@types'

export interface Props {
  pageContext: {
    raw: Hentai[]
    page: {
      current: number
      max: number
    }
    prefix: string
    tag: Tag
    subtitle: string
  }
}
