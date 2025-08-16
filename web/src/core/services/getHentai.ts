import path from 'path'
import { getHentaiFromNH, readDataFile } from '@riffyh/commons'
import type { Hentai } from '@riffyh/commons'

export const getHentai = async (id: number | string) => {
  // try to read local cache, if unable then fetch from scratch
  try {
    return await readDataFile<Hentai>(
      process.cwd(),
      path.join('hentai', `${id}.json`)
    )
  } catch (_) {
    return getHentaiFromNH(id)
  }
}
