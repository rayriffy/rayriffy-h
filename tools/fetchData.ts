import fs from 'fs'
import path from 'path'

import { PrismaClient } from '@prisma/client'
import PQueue from 'p-queue'
import { destr } from 'destr'

import { chunk } from './constants/chunk'
import { cacheDirectory } from './constants/cacheDirectory'
import { getRemoteHentai } from './functions/getRemoteHentai'
import { codes } from '../src/core/constants/codes'
import { itemsPerPage } from '../src/core/constants/itemsPerPage'

import type { Hentai } from '../src/core/@types/Hentai'

const fetchQueue = new PQueue({
  concurrency: 8,
})

;(async () => {
  // generating chunks
  console.log('generating chunks')
  const prebuiltChunkDirectory = path.join(cacheDirectory, 'prebuiltChunks')

  if (!fs.existsSync(prebuiltChunkDirectory)) {
    await fs.promises.mkdir(prebuiltChunkDirectory, { recursive: true })
  }

  const chunks = chunk(codes.reverse(), itemsPerPage)

  await Promise.all(
    chunks.map(async (chunk, i) => {
      const chunkFile = path.join(prebuiltChunkDirectory, `chunk-${i + 1}.json`)
      await fs.promises.writeFile(
        chunkFile,
        JSON.stringify(chunk.map(o => (typeof o === 'number' ? o : o.code)))
      )
    })
  )

  console.log('fetching all galleries')
  const hentaiDirectory = path.join(cacheDirectory, 'hentai')

  if (!fs.existsSync(hentaiDirectory)) {
    await fs.promises.mkdir(hentaiDirectory, { recursive: true })
  }

  let hasError
  let prisma: PrismaClient | undefined

  if (process.env.DATABASE_URL !== undefined) {
    prisma = new PrismaClient()
  }

  await Promise.all(
    codes.map(code =>
      fetchQueue.add(() => getRemoteHentai(code, prisma).catch(() => {
        hasError = true
      }))
    )
  )

  await fetchQueue.onIdle()

  if (hasError) {
    console.error("there's some error during fetching! crashing...")
    process.exit(1)
  } else {
    console.log('fetched all galleries')
  }

  /**
   * Create search keys for searching
   */
  const orderedHentai = codes
    .map(code => {
      try {
        const targetCode = typeof code === 'number' ? code : code.code
        const targetHentai = destr<Hentai>(
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
  await fs.promises.writeFile(
    path.join(cacheDirectory, 'searchKey.json'),
    JSON.stringify(orderedHentai)
  )
})()
