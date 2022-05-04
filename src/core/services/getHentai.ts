import axios from 'axios'

import { hifuminHentaiToHentai } from './hifuminHentaiToHentai'

import { hifuminHentaiQuery } from '../constants/hifuminHentaiQuery'

import { Hentai } from '../@types/Hentai'
import { HifuminSingleResponse } from '../@types/HifuminSingleResponse'

export const getHentai = async (id: number | string): Promise<Hentai> => {
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
    console.error(`error: unable to fetch ${id}`)
    throw e
  }
}
