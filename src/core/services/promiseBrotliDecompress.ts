import { brotliDecompress } from 'zlib'

export const promiseBrotliDecompress = (input: Buffer) =>
  new Promise<Buffer>((res, rej) => {
    brotliDecompress(input, (err, buffer) => {
      if (err === null) {
        res(buffer)
      } else {
        rej(err)
      }
    })
  })
