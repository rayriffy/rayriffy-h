import { fetch } from '@rayriffy-h/fetch'

import { RawHentai } from '../@types/RawHentai'
import { APIResponse } from '../@types/APIResponse'

export const getRawHentai = async (id: number | string, server?: boolean): Promise<RawHentai> => {
  if (server) {
    const out = await fetch<RawHentai>(
      `https://nhentai.net/api/gallery/${id}`
    )
    return out
  } else {
    const out = await fetch<APIResponse<RawHentai>>(
      `https://h.api.rayriffy.com/v1/gallery/${id}`
    )
    return out.response.data
  }
}
