import fs from 'fs'
import path from 'path'

import { destr } from 'destr'
import { hifuminHentaiQuery, hifuminHentaiToHentai } from '@riffyh/commons'

import { env } from '$env/dynamic/private'

import { getHentaiFromNH } from './getHentaiFromNH'

import type { HifuminSingleResponse, Hentai } from '@riffyh/commons'

export const getHentai = async (id: number | string) => {
  // try to read local cache, if unable then fetch from scratch
  try {
    const hentai = await fs.promises.readFile(
      path.join(process.cwd(), 'data/hentai', `${id}.json`),
      'utf8'
    )
    return destr<Hentai>(hentai)
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
        if (o.ok) {
          return destr<HifuminSingleResponse>(await o.text())
        } else {
          throw new Error(destr(await o.text()))
        }
      })

      if (data.data.nhql.by.data === null) {
        throw new Error('Hentai not found')
      } else {
        return hifuminHentaiToHentai(data.data.nhql.by.data)
      }
    } catch (e) {
      return getHentaiFromNH(id)
      // console.error(`error: unable to fetch ${id}`)
      // throw e
    }
  }
}
