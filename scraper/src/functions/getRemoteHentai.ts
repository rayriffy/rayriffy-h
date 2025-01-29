import fs from 'fs'
import path from 'path'

import { hentaiDirectory } from '../constants/hentaiDirectory'

import { Kysely } from 'kysely'
import { DatabaseCode } from '@riffyh/commons'

import { fetchHentai } from './fetchHentai'
import { SQLDatabase } from '../@types/SQLDatabase'

export const getRemoteHentai = async (
  code: DatabaseCode,
  db?: Kysely<SQLDatabase>
) => {
  const targetCode = typeof code === 'object' ? code.code : Number(code)
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
    let localCacheItem: string | null = null

    if (db !== undefined)
      localCacheItem = await db
        .selectFrom('Hentai')
        .select('data')
        .where('id', '=', targetCode)
        .execute()
        .then(res => res[0]?.data ?? null)

    if (localCacheItem === null) {
      const hentai = await fetchHentai(targetCode)

      if (hentai !== null) {
        await fs.promises.writeFile(hentaiFile, JSON.stringify(hentai))
      } else {
        throw 'null'
      }
    } else {
      await fs.promises.writeFile(hentaiFile, localCacheItem)
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
