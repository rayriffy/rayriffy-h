import { hifuminInstance } from '../constants/hifuminInstance'
import { hifuminHentaiQuery } from '../constants/hifuminHentaiQuery'
import { hifuminHentaiToHentai } from './hifuminHentaiToHentai'

import type { AxiosError } from 'axios'
import type { HifuminSingleResponse } from '../@types/HifuminSingleResponse'

export const getHentai = async (id: number | string) => {
  // check if there's local cache
  const cacheHit = false

  console.log({
    cwd: process.cwd(),
  })

  // if found then use local data, otherwise fetch from api
  if (cacheHit) {
  } else {
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
