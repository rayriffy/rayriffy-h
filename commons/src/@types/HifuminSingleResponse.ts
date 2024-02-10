import type { HifuminHentai } from './HifuminHentai'

export interface HifuminSingleResponse {
  data: {
    nhql: {
      by: {
        data: HifuminHentai | null
      }
    }
  }
}
