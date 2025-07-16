import fs from 'node:fs'
import path from 'node:path'

export const downloadImage = async (url: string, hentaiImageDirectory: string, verbose: boolean = false, reattempted = false): Promise<void> => {
  try {
    const filePath = path.join(hentaiImageDirectory, path.basename(url))

    const response = await fetch(url)
      .then(r => {
        if (r.ok) return r.arrayBuffer()
        else throw new Error(`Failed to download ${url}`)
      })
      .then(b => Buffer.from(b))

    return await fs.promises.writeFile(filePath, response)
  } catch (e) {
    if (!reattempted) {
      // image may failed to load because of the extension switching between jpg and webp
      // so we try to download the image with the other extension
      const newUrl = url.replace(/\.jpg$/, '.webp').replace(/\.webp$/, '.jpg')
      return downloadImage(newUrl, hentaiImageDirectory, verbose, true)
    } else {
      if (verbose) console.error(e)
      throw e
    }
  }
}