import { fetch } from '@rayriffy-h/fetch'

import { APIResponse, FetchedRaw, Hentai } from '../../../../core/@types'

export const getHentai = async (id: number | string): Promise<FetchedRaw> => {
  const out = await fetch<APIResponse<Hentai>>(
    `https://h.api.rayriffy.com/v1/gallery/${id}`
  )

  return {
    status: 'success',
    data: {
      hentai_id: Number(id),
      exclude: [],
      raw: out.response.data,
    },
  }
}
