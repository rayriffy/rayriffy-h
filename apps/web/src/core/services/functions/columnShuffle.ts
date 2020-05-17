import { Hentai } from '@rayriffy-h/helper'

export const columnShuffle = <T = Hentai>(raws: T[], column: number): T[][] => {
  return Array.from({ length: column }).map((_, i) => {
    return raws.filter((_, j) => j % column === i)
  })
}
