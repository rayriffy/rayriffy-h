import * as fs from 'fs'
import * as path from 'path'
import { chunk, flatten, reverse } from 'lodash'

import { codes } from '../libs/datasource/src'
import { itemsPerPage } from '../libs/constants/src'
import { Hentai } from '../libs/helper/src'
;(async () => {
  const maxPage = chunk(codes, itemsPerPage).length
  const cacheDir = path.join(process.cwd(), '.cache')

  const allMerged = flatten(
    Array.from({ length: maxPage }).map((_, i) => {
      const targetPage = i + 1

      // read
      const targetFile = path.join(cacheDir, `page-${targetPage}.json`)
      // console.log(targetFile)
      return JSON.parse(fs.readFileSync(targetFile).toString()) as Hentai[]
    })
  )

  const orderedHentai = codes
    .map(code => {
      const targetNumber = typeof code === 'number' ? code : code.code
      const targetHentai = allMerged.find(
        data => data.id.toString() === targetNumber.toString()
      )

      return targetHentai
    })
    .filter(o => o !== undefined)

  const nextDir = path.join(process.cwd(), '.next')
  const publicDir = path.join(process.cwd(), 'public')

  if (fs.existsSync(nextDir) && fs.existsSync(publicDir)) {
    const payload = reverse(orderedHentai)

    await Promise.all(
      [
        (path.join(nextDir, 'public', 'static', 'searchKey.json'),
        path.join(publicDir, 'static', 'searchKey.json')),
      ].map(async targetPath =>
        fs.writeFileSync(targetPath, JSON.stringify(payload))
      )
    )
  }
})()
