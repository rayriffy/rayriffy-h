import type { Hentai } from '../../core/@types/Hentai'

export interface Favorite {
  id: number | string
  internal: boolean
  data: Hentai
}
