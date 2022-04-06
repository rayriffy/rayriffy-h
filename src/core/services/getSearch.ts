import { fetcher } from './fetcher'

import { stringify } from 'querystring'

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
  const transformedQuery = stringify({
    query,
    page,
  })

  if (server) {
    const res = await fetcher<APIResult>(
      `https://nhentai.net/api/galleries/search?${transformedQuery}`
    )
    return {
      raw: res.result,
      maxPage: res.num_pages,
    }
  } else {
    const res = await fetcher<APIResponse<ExportedFunction>>(
      `https://h.api.rayriffy.com/v1/search?${transformedQuery}`
    )
    return res.response.data
  }
}
