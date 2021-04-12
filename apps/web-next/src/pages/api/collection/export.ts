import { NextApiHandler } from 'next'

import { APIResponse } from '@rayriffy-h/helper'
import { CollectionStore } from '@rayriffy-h/state-engine'

import { encrypt } from '../../../core/services/crypto/encrypt'

const api: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    // get data
    const collection: CollectionStore['collection'] = req.body.collection

    // encrypt it
    // 32 character key
    const encryptedData = encrypt(
      JSON.stringify(collection),
      process.env.SECRET_KEY
    )

    // push to bytebin
    const bytebinRes: { key: string } = await fetch(
      `https://bytebin.lucko.me/post`,
      {
        credentials: 'same-origin',
        method: 'POST',
        body: JSON.stringify(encryptedData),
        headers: { 'Content-Type': 'application/json' },
      }
    ).then(o => o.json())

    // send result
    const payload: APIResponse<string> = {
      status: 'success',
      code: 200,
      response: {
        message: 'done',
        data: bytebinRes.key,
      },
    }

    return res.send(payload)
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
