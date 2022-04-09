import { brotliCompress } from 'zlib'

export const promiseBrotliCompress = (input: Buffer) =>
  new Promise<Buffer>((res, rej) => {
    brotliCompress(input, (err, buffer) => {
      if (err === null) {
        res(buffer)
      } else {
        rej(err)
      }
    })
  })
