import { fetch } from '@rayriffy-h/fetch'

import { rawProcessor } from '../../../core/functions/rawProcessor'

import { IHentai } from '../../../core/@types/IHentai'
import { IRawHentai } from '../../../core/@types/IRawHentai'

interface IAPIResponse {
  result: IRawHentai[]
  num_pages: number
  per_page: number
}

export const getSearch = async (
  query: string,
  page: number | string = 1
): Promise<IHentai[]> => {
  const res = await fetch<IAPIResponse>(
    `https://nhentai.net/api/galleries/search?query="${query}"&page=${page}`
  )

  return res.result.map(o => rawProcessor(o))
}
