import { getHentai as getHentaiHelper } from '@rayriffy-h/helper'

import { FetchedRaw } from '../../../../core/@types/FetchedRaw'

export const getHentai = async (id: number | string): Promise<FetchedRaw> => {
  const out = await getHentaiHelper(id)

  return {
    status: 'success',
    data: {
      hentai_id: Number(id),
      exclude: [],
      raw: out,
    },
  }
}
