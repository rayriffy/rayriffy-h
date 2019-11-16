import axios from 'axios'

import { IFetchedRaw } from '../../../../core/@types/IFetchedRaw'

export const getHentai = async (id: number | string): Promise<IFetchedRaw> => {
  try {
    const out = await axios.get(
      `https://nh-express-git-master.rayriffy.now.sh/api/gallery/${id}`
    )

    return {
      status: 'success',
      data: {
        id,
        exclude: [],
        raw: out.data,
      },
    }
  } catch (e) {
    throw e
  }
}
