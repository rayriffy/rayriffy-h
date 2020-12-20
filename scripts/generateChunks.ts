import * as fs from 'fs'
import * as path from 'path'

import { chunk, reverse } from 'lodash'

import { codes } from '../libs/datasource/src'
import { itemsPerPage } from '../libs/constants/src'
;(async () => {
  const cacheDir = path.join(process.cwd(), '.cache')
  const cacheChunkDir = path.join(cacheDir, 'chunks')

  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir)
  }
  if (!fs.existsSync(cacheChunkDir)) {
    fs.mkdirSync(cacheChunkDir)
  }

  const chunks = chunk(reverse(codes), itemsPerPage)

  chunks.map((chunk, i) => {
    const chunkFile = path.join(cacheChunkDir, `chunk-${i + 1}.json`)
    fs.writeFileSync(chunkFile, JSON.stringify(chunk))
  })
})()
