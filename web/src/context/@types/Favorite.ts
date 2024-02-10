import type { Hentai } from '@riffyh/commons'

export interface Favorite {
  id: number | string
  internal: boolean
  data: Hentai
}
