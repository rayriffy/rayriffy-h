import { Tag } from '../../../../core/@types'

export interface Props {
  pageContext: {
    prefix: string
    subtitle: string
    raw: Tag[]
  }
}
