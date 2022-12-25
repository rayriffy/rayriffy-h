import fs from 'fs'
import path from 'path'

import { PrismaClient } from '@prisma/client'
import axios from 'axios'
import dotenv from 'dotenv'
import PQueue from 'p-queue'
import chunk from 'lodash/chunk'
import reverse from 'lodash/reverse'

import { codes } from '../src/core/constants/codes'
import { itemsPerPage } from '../src/core/constants/itemsPerPage'
import { hifuminHentaiQuery } from '../src/core/constants/hifuminHentaiQuery'

import { hifuminHentaiToHentai } from '../src/core/services/hifuminHentaiToHentai'

import type { Hentai as PrismaHentai } from '@prisma/client'
import type { AxiosError } from 'axios'
import type { Hentai } from '../src/core/@types/Hentai'
import type { HifuminSingleResponse } from '../src/core/@types/HifuminSingleResponse'

dotenv.config()

const cacheDirectory = path.join(process.cwd(), 'data')

const fetchQueue = new PQueue({
  concurrency: process.env.CI === 'true' ? 40 : 20,
})

;(async () => {
  // generating chunks
  console.log('generating chunks')
  const prebuiltChunkDirectory = path.join(cacheDirectory, 'prebuiltChunks')

  if (!fs.existsSync(prebuiltChunkDirectory)) {
    await fs.promises.mkdir(prebuiltChunkDirectory, { recursive: true })
  }

  const chunks = chunk(reverse(codes), itemsPerPage)

  await Promise.all(
    chunks.map(async (chunk, i) => {
      const chunkFile = path.join(prebuiltChunkDirectory, `chunk-${i + 1}.json`)
      await fs.promises.writeFile(chunkFile, JSON.stringify(chunk))
    })
  )

  // fetch all hentai
  const fetchHentai = async (
    code: string | number,
    secondAttempt = false
  ): Promise<Hentai | null> => {
    try {
      const query = `
        query SingleHentaiQuery ($hentaiId: Int!) {
          nhql {
            by (id: $hentaiId) {
              data {
                ${hifuminHentaiQuery}
              }
            }
          }
        }
      `

      const { data } = await axios.post<HifuminSingleResponse>(
        process.env.HIFUMIN_API_URL as string,
        {
          query,
          variables: {
            hentaiId: Number(code),
          },
        },
        {
          headers: {
            'Accept-Encoding': '*',
          },
        }
      )

      if (data.data.nhql.by.data === null) {
        return null
      } else {
        return hifuminHentaiToHentai(data.data.nhql.by.data)
      }
    } catch (e) {
      if (secondAttempt) {
        throw e
      } else {
        return fetchHentai(code, true)
      }
    }
  }

  console.log('fetching all galleries')
  const hentaiDirectory = path.join(cacheDirectory, 'hentai')

  if (!fs.existsSync(hentaiDirectory)) {
    await fs.promises.mkdir(hentaiDirectory, { recursive: true })
  }

  let hasError = false

  let prisma: PrismaClient | undefined

  if (process.env.DATABASE_URL !== undefined) {
    prisma = new PrismaClient()
  }

  await Promise.all(
    codes.map(code =>
      fetchQueue.add(async () => {
        const targetCode = typeof code === 'number' ? code : code.code
        const hentaiFile = path.join(hentaiDirectory, `${targetCode}.json`)

        try {
          /**
           * If file cache exists, then no need to do anything
           */
          if (fs.existsSync(hentaiFile)) {
            return
          }

          /**
           * If hentai exists on local cache, then pull data from local cache
           */
          let localCacheItem: PrismaHentai | null = null

          if (prisma !== undefined) {
            localCacheItem = await prisma.hentai.findUnique({
              where: {
                id: Number(targetCode),
              },
            })
          }

          if (localCacheItem === null) {
            const hentai = await fetchHentai(targetCode)

            if (hentai !== null) {
              await fs.promises.writeFile(hentaiFile, JSON.stringify(hentai))
            } else {
              throw 'null'
            }
          } else {
            await fs.promises.writeFile(
              hentaiFile,
              localCacheItem.data as string
            )
          }
        } catch (e) {
          hasError = true
          console.error(
            `failed to get gallery ${targetCode} - ${
              (e as AxiosError)?.code ?? e
            }`
          )

          if (fs.existsSync(hentaiFile)) {
            await fs.promises.rm(hentaiFile)
          }
        }
      })
    )
  )

  if (hasError) {
    console.error("there's some error during fetching! crashing...")
    process.exit(1)
  }
})()
