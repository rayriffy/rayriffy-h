import { TaskQueue } from 'cwait'
import { Cache, Reporter } from 'gatsby'
import { sampleSize } from 'lodash'

import { codes } from '../../../contents/database/codes'

import { getRawData } from './getRawData'

import { IDatabaseCode, IFetchedRaw } from '../../../core/@types'

import { maxSimultaneousDownloads } from '../constants'

export const getData = async (actions: {
  cache: Cache['cache']
  reporter: Reporter
}): Promise<IFetchedRaw[]> => {
  try {
    const queue = new TaskQueue(Promise, maxSimultaneousDownloads)

    const codeList =
      process.env.NODE_ENV === 'production' ? codes : sampleSize(codes, 20)

    const res = await Promise.all(
      codeList.map(
        queue.wrap<IFetchedRaw, IDatabaseCode>(
          async item =>
            await getRawData(
              typeof item === 'number' ? item : item.code,
              typeof item === 'number' ? [] : item.exclude,
              actions
            )
        )
      )
    )

    return res
  } catch (e) {
    throw e
  }
}
