import fs from 'fs'
import path from 'path'

import axios from 'axios'

import { hifuminHentaiToHentai } from './hifuminHentaiToHentai'

import { hifuminHentaiQuery } from '../constants/hifuminHentaiQuery'

import { Hentai } from '../@types/Hentai'
import { HifuminSingleResponse } from '../@types/HifuminSingleResponse'

export const getHentai = async (id: number | string): Promise<Hentai> => {
  // if cache exists, then pull data from cache
  const expectedCachePath = path.join(
    process.cwd(),
    '.next',
    'cache',
    'hentai',
    `${id}.json`
  )

  if (fs.existsSync(expectedCachePath)) {
    const hentai: Hentai = JSON.parse(
      fs.readFileSync(expectedCachePath, 'utf8')
    )

    return hentai
  } else {
    /**
     * Cache not found, fething from API server
     */

    try {
      const { data } = await axios.post<HifuminSingleResponse>(
        process.env.HIFUMIN_API_URL,
        {
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
        }
      )

      if (data.data.nhql.by.data === null) {
        throw new Error('Hentai not found')
      } else {
        return hifuminHentaiToHentai(data.data.nhql.by.data)
      }
    } catch (e) {
      console.log(e?.response?.data)
      console.error(`error: unable to fetch ${id}`)
      throw e
    }
  }
}
