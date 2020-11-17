import fs from 'fs'
import path from 'path'

import { getHentai, Hentai } from '@rayriffy-h/helper'

const getHentaiFromNetwork = async (id: string | number, path: string) => {
  // get hentai
  const hentai = await getHentai(id)

  // write into cache
  fs.writeFileSync(path, JSON.stringify(hentai))

  return hentai
}

export const getHentaiFromCache = async (
  id: string | number
): Promise<Hentai> => {
  const cacheDirectory = path.join(process.cwd(), './.cache')

  // If cacheDirectory does not exist, then create one
  if (!fs.existsSync(cacheDirectory)) {
    fs.mkdirSync(cacheDirectory)
  }

  const cacheFile = path.join(cacheDirectory, `${id}.json`)

  if (fs.existsSync(cacheFile)) {
    try {
      // get data from cache
      const hentai: Hentai = JSON.parse(fs.readFileSync(cacheFile).toString())

      return hentai
    } catch {
      console.log(`${id} failed to obtain data from cache`)
      const hentai = await getHentaiFromNetwork(id, cacheFile)

      return hentai
    }
  } else {
    // if not found, then get it from network
    const hentai = await getHentaiFromNetwork(id, cacheFile)

    return hentai
  }
}
