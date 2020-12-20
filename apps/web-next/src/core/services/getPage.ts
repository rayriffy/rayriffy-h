import fs from 'fs'
import path from 'path'

import { itemsPerPage } from '@rayriffy-h/constants'
import { codes, DatabaseCode } from '@rayriffy-h/datasource'

import chunk from 'lodash/chunk'

export const getPage = (page: number) => {
  const cacheChunkDir = path.join(process.cwd(), '.cache', 'chunks')

  const chunkFile = path.join(cacheChunkDir, `chunk-${page}.json`)

  if (fs.existsSync(chunkFile)) {
    const rawString = fs.readFileSync(chunkFile).toString()
    const databaseCodes: DatabaseCode[] = JSON.parse(rawString)

    return databaseCodes
  } else {
    const chunkedCodes = chunk(codes.reverse(), itemsPerPage)
    console.error(`Failed to find chunk file on page ${page}`)

    return chunkedCodes[page - 1]
  }
}
