import fs from 'fs'
import path from 'path'

import { destr } from 'destr'
import { getHentaiFromNH } from '@riffyh/commons'

import type { Hentai } from '@riffyh/commons'

export const getHentai = async (id: number | string) => {
  // try to read local cache, if unable then fetch from scratch
  try {
    const hentai = await fs.promises.readFile(
      path.join(process.cwd(), 'data/hentai', `${id}.json`),
      'utf8'
    )
    return destr<Hentai>(hentai)
  } catch (_) {
    return getHentaiFromNH(id)
  }
}
