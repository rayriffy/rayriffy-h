import destr from 'destr'

import { Hentai, HifuminSingleResponse, getHentaiFromNH, hifuminHentaiQuery, hifuminHentaiToHentai } from '@riffyh/commons'

export const fetchHentai = async (
  code: string | number,
  secondAttempt = false
): Promise<Hentai | null> => {
  try {
    const query = `
      query SingleHentaiQuery ($hentaiId: Int!) {
        nhql {
          by (id: $hentaiId) {
            data {
              ${hifuminHentaiQuery}
            }
          }
        }
      }
    `

    const { data }: HifuminSingleResponse = await fetch(
      'https://api.hifumin.app/v1/graphql',
      {
        method: 'POST',
        body: JSON.stringify({
          query,
          variables: {
            hentaiId: Number(code),
          },
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    ).then(async o => {
      if (o.ok) {
        return destr(await o.text())
      } else {
        throw new Error(await o.text())
      }
    })

    if (data.nhql.by.data === null) {
      throw null
    } else {
      return hifuminHentaiToHentai(data.nhql.by.data)
    }
  } catch (e) {
    if (secondAttempt) {
      return getHentaiFromNH(code)
    } else {
      await new Promise(res => setTimeout(res, 3000))
      return fetchHentai(code, true)
    }
  }
}
