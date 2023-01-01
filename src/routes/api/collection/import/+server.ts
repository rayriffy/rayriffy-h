import { json } from '@sveltejs/kit'
import { env } from '$env/dynamic/private'

import { decrypt } from '$core/services/crypto/decrypt'

import type { EncryptedData } from '$core/@types/EncryptedData'
import type { RequestHandler } from './$types'
import type { CollectionStore } from '$storeon/@types/CollectionStore'
import type { APIResponse } from '$core/@types/APIResponse'

export const GET: RequestHandler = async event => {
  const code = event.url.searchParams.get('code')

  try {
    const bytebinRes: EncryptedData = await fetch(
      `https://bytebin.lucko.me/${code}`
    ).then(o => o.json())

    // decrypt it
    const decryptedData = decrypt(bytebinRes, env.SECRET_KEY)
    const transformedData: CollectionStore['collection'] =
      JSON.parse(decryptedData)

    const payload: APIResponse<CollectionStore['collection']> = {
      status: 'success',
      code: 200,
      response: {
        message: 'done',
        data: transformedData,
      },
    }

    return json(payload)
  } catch (e) {
    const payload: APIResponse<null> = {
      status: 'failed',
      code: 400,
      response: {
        message: 'decryption-failed',
        data: null,
      },
    }

    return json(payload, {
      status: 400,
    })
  }
}
