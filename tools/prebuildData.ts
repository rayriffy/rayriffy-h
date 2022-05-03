import fs from 'fs'
import path from 'path'

import axios from 'axios'

import { TaskQueue } from 'cwait'
import { chunk, reverse, kebabCase } from 'lodash'

import { codes } from '../src/core/constants/codes'
import { itemsPerPage } from '../src/core/constants/itemsPerPage'

import { rawHentaiToHentai } from '../src/core/services/rawHentaiToHentai'

import { APIResponse } from '../src/core/@types/APIResponse'
import { Hentai } from '../src/core/@types/Hentai'
import { RawHentai } from '../src/core/@types/RawHentai'
import { Tag } from '../src/core/@types/Tag'
import { DatabaseCode } from '../src/core/@types/DatabaseCode'
import { promiseBrotliCompress } from '../src/core/services/promiseBrotliCompress'

const nextCacheDirectory = path.join(__dirname, '..', '.next', 'cache')

const fetchQueue = new TaskQueue(Promise, process.env.CI === 'true' ? 20 : 5)

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

  await Promise.all(
    codes.map(
      fetchQueue.wrap<void, DatabaseCode>(async code => {
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
          console.log(e)
          console.error(`failed to get gallery ${targetCode}`)

          if (fs.existsSync(hentaiFile)) {
            fs.rmSync(hentaiFile)
          }
        }
      })
    )
  )

  // merging those into one searchKey
  console.log('post-processing')
  const targetSearchKey = path.join(
    __dirname,
    '../public/static',
    'searchKey.opt'
  )

  const orderedHentai = codes
    .map(code => {
      try {
        const targetCode = typeof code === 'number' ? code : code.code
        const targetHentai: Hentai = JSON.parse(
          fs
            .readFileSync(path.join(hentaiDirectory, `${targetCode}.json`))
            .toString()
        )

        const transformedHentai: Hentai = {
          ...targetHentai,
          images: {
            ...targetHentai.images,
            pages: [],
          },
        }

        return transformedHentai
      } catch (e) {
        return null
      }
    })
    .filter(o => o !== null)

  const compressedBuffer = await promiseBrotliCompress(
    Buffer.from(JSON.stringify(orderedHentai))
  )
  fs.writeFileSync(targetSearchKey, compressedBuffer)

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

  const rootKeyDirectory = path.join(__dirname, '../public/static/key')

  if (!fs.existsSync(rootKeyDirectory)) {
    fs.mkdirSync(rootKeyDirectory, { recursive: true })
  }

  await Promise.all(
    tagPool.map(async tag => {
      const targetTagFile = path.join(
        rootKeyDirectory,
        `${kebabCase(tag.name)}.opt`
      )

      const compressedBuffer = await promiseBrotliCompress(
        Buffer.from(
          JSON.stringify(
            orderedHentai.filter(o => o.tags.find(t => t.id === tag.id))
          )
        )
      )
      await fs.promises.writeFile(targetTagFile, compressedBuffer)
    })
  )
})()
