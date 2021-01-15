import { NextApiHandler } from 'next'

import { APIResponse } from '@rayriffy-h/helper'
import { CollectionStore } from '@rayriffy-h/state-engine'

import { decrypt } from '../../../../core/services/crypto/decrypt'

import { EncryptedData } from '../../../../core/@types/EncryptedData'

const api: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    // get target key
    const targetKey: string = req.query.id as string

    try {
      const bytebinRes: EncryptedData = await fetch(
        `https://bytebin.lucko.me/${targetKey}`
      ).then(o => o.json())

      // decrypt it
      const decryptedData = decrypt(bytebinRes, process.env.SECRET_KEY)
      const transformedData: CollectionStore['collection'] = JSON.parse(
        decryptedData
      )

      const payload: APIResponse<CollectionStore['collection']> = {
        status: 'success',
        code: 200,
        response: {
          message: 'done',
          data: transformedData,
        },
      }

      return res.send(payload)
    } catch (e) {
      const payload: APIResponse<never> = {
        status: 'failed',
        code: 400,
        response: {
          message: 'decryption-failed',
        },
      }

      return res.status(400).send(payload)
    }
  } else {
    const payload: APIResponse<never> = {
      status: 'failed',
      code: 405,
      response: {
        message: 'invalid method',
      },
    }

    return res.status(405).send(payload)
  }
}

export default api
