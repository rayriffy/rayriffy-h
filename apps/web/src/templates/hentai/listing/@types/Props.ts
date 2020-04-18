import { Hentai } from '@rayriffy-h/helper'

export interface Props {
  pageContext: {
    raw: Hentai[]
    page: {
      current: number
      max: number
    }
  }
}
