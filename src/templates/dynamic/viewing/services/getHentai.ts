import { IAPIResponse } from '../../../../core/@types/IAPIResponse'
import { IFetchedRaw } from '../../../../core/@types/IFetchedRaw'
import { IHentai } from '../../../../core/@types/IHentai'

export const getHentai = async (id: number | string): Promise<IFetchedRaw> => {
  try {
    const out: IAPIResponse<IHentai> = await fetch(
      `https://h.api.rayriffy.com/v1/gallery/${id}`
    ).then(raw => raw.json())

    return {
      status: 'success',
      data: {
        id,
        exclude: [],
        raw: out.response.data,
      },
    }
  } catch (e) {
    throw e
  }
}
