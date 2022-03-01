import fs from 'fs'
import path from 'path'
import { getHentai, Hentai } from '@rayriffy-h/helper'

export const getHentaiCache = async (id: string | number) => {
  const cachePath = path.join(process.cwd(), '.next', 'cache', 'hentai')
  const hentaiCacheFile = path.join(cachePath, `${id}.json`)

  // if cache not found, then get fresh data
  if (!fs.existsSync(hentaiCacheFile)) {
    const hentai = await getHentai(id)

    // create cache folder if not exist
    if (!fs.existsSync(cachePath)) {
      fs.mkdirSync(cachePath, { recursive: true })
    }

    // write cache
    fs.writeFileSync(hentaiCacheFile, JSON.stringify(hentai))

    return hentai
  } else {
    // read cache
    const hentai: Hentai = JSON.parse(
      fs.readFileSync(hentaiCacheFile).toString()
    )

    return hentai
  }
}
