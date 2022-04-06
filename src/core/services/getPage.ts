import fs from 'fs'
import path from 'path'

import chunk from 'lodash/chunk'

import { codes } from '../constants/codes'
import { itemsPerPage } from '../constants/itemsPerPage'
import { DatabaseCode } from '../@types/DatabaseCode'

export const getPage = (page: number) => {
  const cacheChunkDir = path.join(
    process.cwd(),
    '.next',
    'cache',
    'prebuiltChunks'
  )

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
