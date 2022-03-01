import { gunzip } from 'zlib'

export const promiseGunzip = (input: Buffer) =>
  new Promise<Buffer>((res, rej) => {
    gunzip(input, (err, buffer) => {
      if (err === null) {
        res(buffer)
      } else {
        rej(err)
      }
    })
  })
