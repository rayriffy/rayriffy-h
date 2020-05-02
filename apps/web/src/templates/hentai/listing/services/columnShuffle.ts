import { Hentai } from '@rayriffy-h/helper'

export const columnShuffle = (raws: Hentai[], column: number) => {
  return Array.from({ length: column }).map((_, i) => {
    return raws.filter((_, j) => j % column === i)
  })
}
