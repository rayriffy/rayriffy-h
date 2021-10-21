import * as fs from 'fs'
import * as path from 'path'
import { gzip, gunzip } from 'zlib'

import axios from 'axios'

import { TaskQueue } from 'cwait'
import { Promise as BluebirdPromise } from 'bluebird'
import { chunk, reverse, flatten, kebabCase } from 'lodash'

import { rawHentaiToHentai } from '../libs/helper/src/functions/rawHentaiToHentai'
import { codes, DatabaseCode } from '../libs/datasource/src'
import { itemsPerPage } from '../libs/constants/src'

import { APIResponse } from '../libs/helper/src/@types/APIResponse'
import { Hentai } from '../libs/helper/src/@types/Hentai'
import { RawHentai } from '../libs/helper/src/@types/RawHentai'
import { Tag } from '../libs/helper/src/@types/Tag'

const nextCacheDirectory = path.join(process.cwd(), '.next', 'cache')

const queue = new TaskQueue(BluebirdPromise, process.env.CI === 'true' ? 20 : 5)

;(async () => {
  // generating chunks
  console.log('generating chunks')
  const prebuiltChunkDirectory = path.join(nextCacheDirectory, 'prebuiltChunks')

  if (!fs.existsSync(prebuiltChunkDirectory)) {
    fs.mkdirSync(prebuiltChunkDirectory, { recursive: true })
  }

  const chunks = chunk(reverse(codes), itemsPerPage)

  chunks.map((chunk, i) => {
    const chunkFile = path.join(prebuiltChunkDirectory, `chunk-${i + 1}.json`)
    fs.writeFileSync(chunkFile, JSON.stringify(chunk))
  })

  // fetch all hentai
  const fetchHentai = async (
    code: string | number,
    secondAttempt = false
  ): Promise<Hentai> => {
    try {
      const rawResult = await axios.get<APIResponse<RawHentai>>(
        `https://h.api.rayriffy.com/v1/gallery/${code}`
      )

      const rawHentai = rawResult.data.response.data
      const transformedRawHentai: RawHentai = {
        ...rawHentai,
        title: {
          ...rawHentai.title,
          english:
            rawHentai.title.english === null
              ? rawHentai.title.japanese
              : rawHentai.title.english,
          japanese:
            rawHentai.title.japanese === null
              ? rawHentai.title.english
              : rawHentai.title.japanese,
        },
      }

      return rawHentaiToHentai(transformedRawHentai)
    } catch (e) {
      if (secondAttempt) {
        throw e
      } else {
        return fetchHentai(code, true)
      }
    }
  }

  console.log('fetching all galleries')
  const hentaiDirectory = path.join(nextCacheDirectory, 'hentai')

  if (!fs.existsSync(hentaiDirectory)) {
    fs.mkdirSync(hentaiDirectory, { recursive: true })
  }

  await BluebirdPromise.map(
    codes,
    queue.wrap<void, DatabaseCode>(async code => {
      const targetCode = typeof code === 'number' ? code : code.code
      const hentaiFile = path.join(hentaiDirectory, `${targetCode}.json`)

      try {
        // skip if already exists
        if (fs.existsSync(hentaiFile)) {
          return
        }

        const hentai = await fetchHentai(targetCode)

        fs.writeFileSync(hentaiFile, JSON.stringify(hentai))
      } catch (e) {
        console.error(`failed to get gallery ${targetCode}`)
        throw 'failed-to-fetch'
      }
    })
  )

  // merging those into one searchKey
  console.log('post-processing')
  const targetSearchKey = path.join(__dirname, '../apps/web-next/public/static', 'searchKey.opt')

  const promiseGzip = (input: Buffer) => new Promise<Buffer>((res, rej) => {
    gzip(input, (err, buffer) => {
      if (err === null) {
        res(buffer)
      } else {
        rej(err)
      }
    })
  })

  const orderedHentai = codes.map(code => {
    const targetCode = typeof code === 'number' ? code : code.code
    const targetHentai: Hentai = JSON.parse(fs.readFileSync(path.join(hentaiDirectory, `${targetCode}.json`)).toString())

    const transformedHentai: Hentai = {
      ...targetHentai,
      images: {
        ...targetHentai.images,
        pages: [],
      },
    }

    return transformedHentai
  })

  const gzippedBuffer = await promiseGzip(Buffer.from(JSON.stringify(orderedHentai)))
  fs.writeFileSync(targetSearchKey, gzippedBuffer)

  // searchKey by tag
  const tagPool: Tag[] = []
  orderedHentai.map(hentai => {
    hentai.tags.map(tag => {
      const targetTagPool = tagPool.find(pool => pool.id === tag.id)

      if (!targetTagPool) {
        tagPool.push(tag)
      }
    })
  })

  const rootKeyDirectory = path.join(__dirname, '../apps/web-next/public/static/key')

  if (!fs.existsSync(rootKeyDirectory)) {
    fs.mkdirSync(rootKeyDirectory, { recursive: true })
  }

  await Promise.all(tagPool.map(async tag => {
    const targetTagFile = path.join(rootKeyDirectory, `${kebabCase(tag.name)}.opt`)

    const gzippedBuffer = await promiseGzip(Buffer.from(JSON.stringify(orderedHentai.filter(o => o.tags.find(t => t.id === tag.id)))))
    await fs.promises.writeFile(targetTagFile, gzippedBuffer)
  }))
})()
