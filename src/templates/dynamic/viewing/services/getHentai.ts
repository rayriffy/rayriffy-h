import { fetch } from '../../../../core/services/functions'

import { IAPIResponse, IFetchedRaw, IHentai } from '../../../../core/@types'

export const getHentai = async (id: number | string): Promise<IFetchedRaw> => {
  try {
    const out = await fetch<IAPIResponse<IHentai>>(
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
  } catch (e) {
    throw e
  }
}
