import { Tag } from '@rayriffy-h/helper'

export interface Props {
  pageContext: {
    prefix: string
    subtitle: string
    raw: Tag[]
  }
}
