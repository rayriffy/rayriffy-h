import * as fs from 'fs'
import * as path from 'path'

import { chunk, reverse } from 'lodash'

import { codes } from '../libs/datasource/src'
import { itemsPerPage } from '../libs/constants/src'
;(async () => {
  const cacheDir = path.join(process.cwd(), '.next', 'cache', 'prebuiltChunks')

  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true })
  }

  const chunks = chunk(reverse(codes), itemsPerPage)

  chunks.map((chunk, i) => {
    const chunkFile = path.join(cacheDir, `chunk-${i + 1}.json`)
    fs.writeFileSync(chunkFile, JSON.stringify(chunk))
  })
})()
