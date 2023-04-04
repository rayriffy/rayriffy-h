import { json } from '@sveltejs/kit'
import { env } from '$env/dynamic/private'

import { encrypt } from '$core/services/crypto/encrypt'

import type { RequestHandler } from './$types'
import type { CollectionStore } from '$storeon/@types/CollectionStore'
import type { APIResponse } from '$core/@types/APIResponse'

export const POST: RequestHandler = async event => {
  try {
    // get data
    const collection: CollectionStore['collection'] = (await event.request.json())
      .collection

    console.log(`read ${collection.data.length} items`)

    // encrypt it
    // 32 character key
    const encryptedData = encrypt(JSON.stringify(collection), env.SECRET_KEY)

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

    console.log(bytebinRes)

    // send result
    const payload: APIResponse<string> = {
      status: 'success',
      code: 200,
      response: {
        message: 'done',
        data: bytebinRes.key,
      },
    }

    return json(payload)
  } catch (e) {
    console.error(e)
    return json({
      status: 'failure',
      code: 500,
      response: {
        message: 'server failure',
      },
    }, {
      status: 500
    })
  }
}
