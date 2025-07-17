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
      // Original URL failed but has image extension, try alternate format
      const alternateUrl = url.endsWith('.jpg') 
        ? url.replace('.jpg', '.webp') 
        : url.replace('.webp', '.jpg')

      return downloadImage(alternateUrl, hentaiImageDirectory, verbose, true)
    } else {
      if (verbose) console.error(e)
      throw e
    }
  }
}