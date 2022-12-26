import fs from 'fs'
import path from 'path'

import { hifuminInstance } from '../constants/hifuminInstance'
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
      const { data } = await hifuminInstance.post<HifuminSingleResponse>('', {
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
