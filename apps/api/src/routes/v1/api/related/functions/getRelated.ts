import { fetch } from '@rayriffy-h/fetch'

import { IRawHentai } from '../../../core/@types/IRawHentai'
import { IRelated } from '../@types/IRelated'

export const getRelated = async (
  id: number | string
): Promise<IRawHentai[]> => {
  const res = await fetch<IRelated>(
    `https://nhentai.net/api/gallery/${id}/related`
  )

  return res.result
}
