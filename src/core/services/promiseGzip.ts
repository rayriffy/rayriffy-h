import { gzip } from 'zlib'

export const promiseGzip = (input: Buffer) =>
  new Promise<Buffer>((res, rej) => {
    gzip(input, (err, buffer) => {
      if (err === null) {
        res(buffer)
      } else {
        rej(err)
      }
    })
  })
