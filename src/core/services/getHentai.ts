import fs from 'fs'
import path from 'path'

import { env } from '$env/dynamic/private'

import { hifuminHentaiQuery } from '../constants/hifuminHentaiQuery'
import { hifuminHentaiToHentai } from './hifuminHentaiToHentai'

import type { HifuminSingleResponse } from '../@types/HifuminSingleResponse'
import type { Hentai } from '../@types/Hentai'

export const getHentai = async (id: number | string) => {
  // try to read local cache, if unable then fetch from scratch
  try {
    const hentai = await fs.promises.readFile(
      path.join(process.cwd(), 'data/hentai', `${id}.json`),
      'utf8'
    )
    return JSON.parse(hentai) as Hentai
  } catch (_) {
    try {
      const data = await fetch(env.HIFUMIN_API_URL, {
        body: JSON.stringify({
          query: `
            query SingleHentaiQuery ($hentaiId: Int!) {
              nhql {
                by (id: $hentaiId) {
                  data {
                    ${hifuminHentaiQuery}
                  }
                }
              }
            }
          `,
          variables: {
            hentaiId: Number(id),
          },
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }).then(async o => {
        if (o.status === 200) {
          return o.json() as Promise<HifuminSingleResponse>
        } else {
          throw new Error(await o.json())
        }
      })

      if (data.data.nhql.by.data === null) {
        throw new Error('Hentai not found')
      } else {
        return hifuminHentaiToHentai(data.data.nhql.by.data)
      }
    } catch (e) {
      // console.log((e as AxiosError).response?.data)
      console.error(`error: unable to fetch ${id}`)
      throw e
    }
  }
}
