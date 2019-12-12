import axios from 'axios'

import { IFetchedRaw } from '../../../../core/@types/IFetchedRaw'
import { IHentai } from '../../../../core/@types/IHentai'

export const getHentai = async (id: number | string): Promise<IFetchedRaw> => {
  try {
    const out = await axios.get<IHentai>(`https://opener.now.sh/api/data/${id}`)

    return {
      status: 'success',
      data: {
        id,
        exclude: [],
        raw: {
          id: out.data.id,
          media_id: out.data.media_id,
          title: out.data.title,
          images: {
            cover: {
              h: out.data.images.cover.h,
              t: out.data.images.cover.t,
              w: out.data.images.cover.w,
            },
            pages: out.data.images.pages.map(o => ({
              h: o.h,
              t: o.t,
              w: o.w,
            })),
          },
          tags: out.data.tags.map(o => ({
            id: o.id,
            name: o.name,
            type: o.type,
          })),
        },
      },
    }
  } catch (e) {
    throw e
  }
}
