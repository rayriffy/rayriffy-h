import { fetch } from '@rayriffy-h/fetch'

import { rawProcessor } from '../../../core/functions/rawProcessor'

import { Hentai } from '../../../core/@types/Hentai'
import { RawHentai } from '../../../core/@types/RawHentai'

export const getHentai = async (id: number | string): Promise<Hentai> => {
  const res = await fetch<RawHentai>(
    `https://nhentai.net/api/gallery/${id}`
  )

  return rawProcessor(res)
}
