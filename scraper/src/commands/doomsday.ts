import fs from 'node:fs'
import path from 'node:path'

import PQueue from "p-queue";
import { getImageUrl, type Hentai } from "@riffyh/commons";

import { hentaiDirectory } from "../constants/hentaiDirectory";
import { imageDirectory } from "../constants/imageDirectory";

export const doomsday = async (concurrency = 20)=> {
  // locate list of hentai generated into hentai directory
  const hentaiIds = await fs.promises.readdir(hentaiDirectory)
    .then(files => files.map(f => Number(f.replace('.json', ''))))
    .then(ids => ids.sort((a, b) => b - a))
  console.log('read ' + hentaiIds.length + ' items')

  console.log('downloading images...')
  const idsNeedsToBeDownloaded = hentaiIds
    .filter(id => !fs.existsSync(path.join(imageDirectory, id.toString())))

  console.log(`${idsNeedsToBeDownloaded.length} galleries needs to be downloaded`)

  let success = 0
  let fail = 0

  for await (const id of idsNeedsToBeDownloaded) {
    const downloadQueue = new PQueue({ concurrency })
    const hentaiImageDirectory = path.join(imageDirectory, id.toString())

    try {
      await fs.promises.mkdir(hentaiImageDirectory, { recursive: true })

      // read file
      const hentai: Hentai = await fs.promises.readFile(path.join(hentaiDirectory, `${id}.json`), 'utf8').then(JSON.parse)

      // build urls
      const fullSizedImagesUrls = [hentai.images.cover, ...hentai.images.pages].map((image, i) =>
        getImageUrl({
          image,
          mediaId: hentai.media_id,
          page: i,
          type: i === 0 ? 'cover' : 'gallery'
        })
      )
      const thumbnailImageUrls = hentai.images.pages.map((image, i) =>
        getImageUrl({
          image,
          mediaId: hentai.media_id,
          page: i + 1,
          type: 'thumbnail'
        })
      )

      await Promise.all(
        [...fullSizedImagesUrls, ...thumbnailImageUrls].map(url =>
          downloadQueue.add(async () =>
            fs.promises.writeFile(
              path.join(hentaiDirectory, path.basename(url)),
              await fetch(url)
                .then(r => {
                  if (r.ok) return r.arrayBuffer()
                  else throw new Error(`Failed to download ${url}`)
                })
                .then(b => Buffer.from(b))
            )
          )
        )
      )

      success++
    } catch (e) {
      fail++
      fs.promises.rmdir(hentaiDirectory).catch(() => {})
    }

    console.log(`[${(success + fail).toLocaleString()} (S ${success.toLocaleString()} / E ${fail.toLocaleString()}) / ${idsNeedsToBeDownloaded.length.toLocaleString()}] gallery ${id} processed`)
  }
}
