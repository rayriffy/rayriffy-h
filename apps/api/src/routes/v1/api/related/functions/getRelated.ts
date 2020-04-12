import { fetch } from '@rayriffy-h/fetch'

import { RawHentai } from '../../../core/@types/RawHentai'
import { Related } from '../@types/Related'

export const getRelated = async (
  id: number | string
): Promise<RawHentai[]> => {
  const res = await fetch<Related>(
    `https://nhentai.net/api/gallery/${id}/related`
  )

  return res.result
}
