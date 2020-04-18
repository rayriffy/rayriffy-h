import { Hentai, Tag } from '@rayriffy-h/helper'

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
