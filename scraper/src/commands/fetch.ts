import fs from 'fs'
import path from 'path'

import PQueue from 'p-queue'
import { DatabaseCode, Hentai, itemsPerPage } from '@riffyh/commons'

import { chunk } from '../constants/chunk'
import { cacheDirectory } from '../constants/cacheDirectory'
import { Kysely } from 'kysely'
import { SQLDatabase } from '../@types/SQLDatabase'
import { createDBConnection } from '../functions/createDBConnection'
import { getRemoteHentai } from '../functions/getRemoteHentai'
import {parseUrl} from "../functions/parseUrl";

const fetchQueue = new PQueue({
  concurrency: 8,
})

export const fetch = async (entryPoint: string) => {
  const { default: codes } = (await import(
    path.join(process.cwd(), entryPoint)
  )) as {
    default: DatabaseCode[]
  }

  console.log('read ' + codes.length + ' items')

  /**
   * Step 1: Generate chunks
   */
  console.log('generating chunks')
  const prebuiltChunkDirectory = path.join(cacheDirectory, 'prebuiltChunks')

  // create directory if not exist
  if (!fs.existsSync(prebuiltChunkDirectory))
    await fs.promises.mkdir(prebuiltChunkDirectory, { recursive: true })

  const chunks = chunk(codes.reverse(), itemsPerPage)

  // populate files
  await Promise.all(
    chunks.map(async (chunk, i) => {
      const chunkFile = path.join(prebuiltChunkDirectory, `chunk-${i + 1}.json`)
      await fs.promises.writeFile(
        chunkFile,
        JSON.stringify(chunk.map(o => (typeof o === 'number' ? o : typeof o === 'string' ? parseUrl(o) : o.code)))
      )
    })
  )

  /**
   * Step 2: Fetch all items
   */
  console.log('fetching all galleries')
  const hentaiDirectory = path.join(cacheDirectory, 'hentai')

  if (!fs.existsSync(hentaiDirectory))
    await fs.promises.mkdir(hentaiDirectory, { recursive: true })

  let hasError
  let db: Kysely<SQLDatabase> | undefined

  if (process.env.DATABASE_URL !== undefined) db = createDBConnection()

  await Promise.all(
    codes.map(code =>
      fetchQueue.add(() =>
        getRemoteHentai(code, db).catch(() => {
          hasError = true
        })
      )
    )
  )

  await fetchQueue.onIdle()
  await db?.destroy()

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
        const targetCode = typeof code === 'number' ? code : typeof code === 'string' ? parseUrl(code) : code.code
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

  await fs.promises.writeFile(
    path.join(cacheDirectory, 'searchKey.json'),
    JSON.stringify(orderedHentai)
  )
}
