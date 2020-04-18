import { fetch } from '@rayriffy-h/fetch'

import { RawHentai } from '../@types/RawHentai'
import { APIResponse } from '../@types/APIResponse'

interface APIResult {
  result: RawHentai[]
  num_pages: number
  per_page: number
}

export const getSearch = async (
  query: string,
  page: number | string = 1,
  server?: boolean
): Promise<RawHentai[]> => {
  if (server) {
    const res = await fetch<APIResult>(
      `https://nhentai.net/api/galleries/search?query="${query}"&page=${page}`
    )
    return res.result
  } else {
    const res = await fetch<APIResponse<RawHentai[]>>(
      `https://h.api.rayriffy.com/v1/search?query="${query}"&page=${page}`
    )
    return res.response.data
  }
}
