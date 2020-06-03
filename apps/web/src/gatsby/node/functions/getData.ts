import { TaskQueue } from 'cwait'
import { GatsbyCache, Reporter } from 'gatsby'
import { sampleSize } from 'lodash'

import { codes } from '../../../contents/database/codes'

import { getRawData } from './getRawData'

import { DatabaseCode } from '../../../core/@types/DatabaseCode'
import { FetchedRaw } from '../../../core/@types/FetchedRaw'

import { maxSimultaneousDownloads } from '../constants'

export const getData = async (actions: {
  cache: GatsbyCache
  reporter: Reporter
}): Promise<FetchedRaw[]> => {
  const queue = new TaskQueue(Promise, maxSimultaneousDownloads)

  const codeList =
    process.env.NODE_ENV === 'production' ? codes : sampleSize(codes, 20)

  // const codeList = codes

  const res = await Promise.all(
    codeList.map(
      queue.wrap<FetchedRaw, DatabaseCode>(
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
}
