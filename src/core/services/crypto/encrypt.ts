import crypto from 'crypto'

import { EncryptedData } from '../../@types/EncryptedData'

export const encrypt = (input: string, key: string): EncryptedData => {
  const encryptionKey = Buffer.from(key)

  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, iv)

  let enc = cipher.update(input, 'utf8', 'base64')
  enc += cipher.final('base64')

  return {
    iv: iv.toString('base64'),
    data: enc,
  }
}
