import fs from 'fs'
import path from 'path'
import { cacheDirectory } from '../../constants/image/cacheDirectory'
import { getExtension } from './getExtension'

export const writeImageToFileSystem = async (
  cacheKey: string,
  contentType: string,
  maxAge: number,
  etag: string,
  buffer: Buffer
) => {
  // get file extension by content type
  let extension = getExtension(contentType)

  // build final file path
  const targetDirectory = path.join(cacheDirectory, cacheKey)
  const targetFileName = `${maxAge}.${maxAge + Date.now()}.${etag}.${extension}`

  await fs.promises.mkdir(targetDirectory, { recursive: true })
  await fs.promises.writeFile(
    path.join(targetDirectory, targetFileName),
    buffer
  )
}
