import crypto from 'crypto'

import { EncryptedData } from '../../@types/EncryptedData'

export const decrypt = (enc: EncryptedData, key: string): string => {
  const encryptionKey = Buffer.from(key)

  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    encryptionKey,
    Buffer.from(enc.iv, 'base64')
  )

  let str = decipher.update(enc.data, 'base64', 'utf8')
  str += decipher.final('utf8')

  return str
}
