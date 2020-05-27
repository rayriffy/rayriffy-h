import { fetch } from '@rayriffy-h/fetch'

import { RawHentai } from '../@types/RawHentai'
import { APIResponse } from '../@types/APIResponse'

interface APIResult {
  result: RawHentai[]
  num_pages: number
  per_page: number
}

interface ExportedFunction {
  raw: RawHentai[]
  maxPage: number
}

export const getSearch = async (
  query: string,
  page: number | string = 1,
  server?: boolean
): Promise<ExportedFunction> => {
  if (server) {
    const res = await fetch<APIResult>(
      `https://nhentai.net/api/galleries/search?query=${query}&page=${page}`
    )
    return {
      raw: res.result,
      maxPage: res.num_pages
    }
  } else {
    const res = await fetch<APIResponse<ExportedFunction>>(
      `https://h.api.rayriffy.com/v1/search?query=${query}&page=${page}`
    )
    return res.response.data
  }
}
