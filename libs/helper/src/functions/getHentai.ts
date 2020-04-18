import { getRawHentai } from './getRawHentai'

import { Hentai } from '../@types/Hentai'
import { rawHentaiToHentai } from './rawHentaiToHentai'

export const getHentai = async (id: number | string): Promise<Hentai> => {
  const rawHentai = await getRawHentai(id)

  return rawHentaiToHentai(rawHentai)
}
