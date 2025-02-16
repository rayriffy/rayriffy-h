import fs from 'fs'
import path from 'path'

import { DatabaseCode, Hentai, itemsPerPage } from '@riffyh/commons'

import { chunk } from '../constants/chunk'
import { cacheDirectory } from '../constants/cacheDirectory'
import { hentaiDirectory } from '../constants/hentaiDirectory'
import { parseUrl } from "../functions/parseUrl";
import { getGalleriesViaBrowser } from "../functions/getGalleriesViaBrowser";
import { getGalleriesViaFetch } from "../functions/getGalleriesViaFetch";
import { getGalleriesViaCache } from "../functions/getGalleriesViaCache";

export const fetch = async (entryPoint: string, browserMode: boolean) => {
  if (process.env.MONGODB_URL === undefined) {
    console.error(
      'no database url provided, please provide postgres connection url'
    )
    return process.exit(1)
  }

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
        JSON.stringify(
          chunk.map(o => (typeof o === 'number' ? o : typeof o === 'string' ? parseUrl(o) : o.code))
        )
      )
    })
  )

  console.log(`${chunks.length} chunks generated`)

  /**
   * Step 2: Fetch all items
   */
  console.log('fetching galleries...')
  if (!fs.existsSync(hentaiDirectory))
    await fs.promises.mkdir(hentaiDirectory, { recursive: true })

  const idsNeedsToBeFetched = codes
    .map(code => typeof code === 'object' ? code.code : code)
    .map(code => Number(code))
    .filter(code => {
      return !fs.existsSync(path.join(hentaiDirectory, `${code}.json`))
    })

  console.log(`${idsNeedsToBeFetched.length} galleries needs to be fetched`)

  if (idsNeedsToBeFetched.length > 0) {
    const idsFetchedFromMongo = await getGalleriesViaCache(idsNeedsToBeFetched)

    console.log(`${idsNeedsToBeFetched.length - idsFetchedFromMongo.length} needs to be fetched further`)

    const fetchResult = await (browserMode ? getGalleriesViaBrowser : getGalleriesViaFetch)(
      idsNeedsToBeFetched.filter(o => !idsFetchedFromMongo.includes(o))
    )

    if (fetchResult.failure > 0) {
      console.error("there's some error during fetching! crashing...")
      process.exit(1)
    } else {
      console.log('fetched all galleries')
    }
  }

  /**
   * Create search keys for searching
   */
  console.log('generating search keys...')
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

  console.log('completed!')
  process.exit(0)
}
