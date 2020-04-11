import { fetch } from '@rayriffy-h/fetch'

import { rawProcessor } from '../../../core/functions/rawProcessor'

import { IHentai } from '../../../core/@types/IHentai'
import { IRawHentai } from '../../../core/@types/IRawHentai'

export const getHentai = async (id: number | string): Promise<IHentai> => {
  const res = await fetch<IRawHentai>(
    `https://nhentai.net/api/gallery/${id}`
  )

  return rawProcessor(res)
}
