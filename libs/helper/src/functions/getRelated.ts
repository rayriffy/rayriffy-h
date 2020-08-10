import { fetch } from '@rayriffy-h/fetch'

import { RawHentai } from '../@types/RawHentai'
import { APIResponse } from '../@types/APIResponse'

export const getRelated = async (
  id: number | string,
  server?: boolean
): Promise<RawHentai[]> => {
  if (server) {
    const res = await fetch<{ result: RawHentai[] }>(
      `https://nhentai.net/api/gallery/${id}/related`
    )
    return res.result
  } else {
    const out = await fetch<{ result: RawHentai[] }>(
      `https://cors-anywhere.herokuapp.com/https://nhentai.net/api/gallery/${id}/related`,
      {
        headers: {
          Origin: 'https://h.rayriffy.com',
        },
      }
    )
    return out.result
  }
}
