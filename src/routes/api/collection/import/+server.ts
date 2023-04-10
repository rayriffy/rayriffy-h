import { json } from '@sveltejs/kit'
import { env } from '$env/dynamic/private'

import PQueue from 'p-queue'
import destr from 'destr'

import { decrypt } from '$core/services/crypto/decrypt'
import { getHentai } from '$core/services/getHentai'

import type { EncryptedData } from '$core/@types/EncryptedData'
import type { RequestHandler } from './$types'
import type { CollectionStore } from '$storeon/@types/CollectionStore'
import type { APIResponse } from '$core/@types/APIResponse'
import type { Hentai } from '$core/@types/Hentai'
import type { Favorite } from '$storeon/@types/Favorite'

const fetchQueue = new PQueue({
  concurrency: 20,
})

export const GET: RequestHandler = async event => {
  const code = event.url.searchParams.get('code')

  try {
    const bytebinRes: EncryptedData = await fetch(
      `https://bytebin.lucko.me/${code}`
    ).then(async o => destr(await o.text()))

    // decrypt it
    const decryptedData = decrypt(bytebinRes, env.SECRET_KEY)
    const decryptedHentaiIds: (string | number)[] =
      destr(decryptedData)
    
    // parse into collections
    let fetchedHentais: Hentai[] = []
    await Promise.all(decryptedHentaiIds.map(id => fetchQueue.add(async () => {
      try {
        fetchedHentais.push(await getHentai(id))
      } catch (e) {
        console.log('failed to import item id ', id)
      }
    })))

    let orderedItems: Favorite[] = decryptedHentaiIds
      .map(id =>
        fetchedHentais.find(o => Number(o.id) === Number(id))
      )
      .filter(o => o !== undefined)
      .map(hentai => ({
        id: hentai!.id,
        internal: false,
        data: {
          ...hentai!,
          images: {
            ...hentai!.images,
            pages: []
          },
        }
      }))

    const transformedData: CollectionStore['collection'] = {
      version: 2,
      data: orderedItems
    }

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
