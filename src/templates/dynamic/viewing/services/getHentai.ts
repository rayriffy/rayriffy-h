import axios from 'axios'

import { IAPIResponse } from '../../../../core/@types/IAPIResponse'
import { IFetchedRaw } from '../../../../core/@types/IFetchedRaw'
import { IHentai } from '../../../../core/@types/IHentai'

export const getHentai = async (id: number | string): Promise<IFetchedRaw> => {
  try {
    const out = await axios.get<IAPIResponse<IHentai>>(
      `https://h.api.rayriffy.com/v1/gallery/${id}`
    )

    return {
      status: 'success',
      data: {
        id,
        exclude: [],
        raw: out.data.response.data,
      },
    }
  } catch (e) {
    throw e
  }
}
