import fs from 'fs'
import path from 'path'

import { hentaiDirectory } from '../constants/hentaiDirectory'

import type { DatabaseCode } from '../../src/core/@types/DatabaseCode'
import type { PrismaClient, Hentai as PrismaHentai } from '@prisma/client'
import { fetchHentai } from './fetchHentai'

export const getRemoteHentai = async (
  code: DatabaseCode,
  prisma?: PrismaClient
) => {
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
      await fs.promises.writeFile(hentaiFile, localCacheItem.data as string)
    }
  } catch (e) {
    // hasError = true
    console.error(
      `failed to get gallery ${targetCode} - ${(e as Error)?.message ?? e}`
    )

    if (fs.existsSync(hentaiFile)) {
      await fs.promises.rm(hentaiFile)
    }

    throw e
  }
}
