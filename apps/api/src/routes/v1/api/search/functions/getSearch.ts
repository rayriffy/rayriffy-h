import { fetch } from '@rayriffy-h/fetch'

import { rawProcessor } from '../../../core/functions/rawProcessor'

import { Hentai } from '../../../core/@types/Hentai'
import { RawHentai } from '../../../core/@types/RawHentai'

interface APIResponse {
  result: RawHentai[]
  num_pages: number
  per_page: number
}

export const getSearch = async (
  query: string,
  page: number | string = 1
): Promise<Hentai[]> => {
  const res = await fetch<APIResponse>(
    `https://nhentai.net/api/galleries/search?query="${query}"&page=${page}`
  )

  return res.result.map(o => rawProcessor(o))
}
