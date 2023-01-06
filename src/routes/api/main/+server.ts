import { json } from '@sveltejs/kit'
import { env } from '$env/dynamic/private'

import { hifuminHentaiQuery } from '$core/constants/hifuminHentaiQuery'

import { hentaiToMinifiedHentaiForListing } from '$core/services/hentaiToMinifiedHentaiForListing'
import { hifuminHentaiToHentai } from '$core/services/hifuminHentaiToHentai'

import type { RequestHandler } from './$types'
import type { HifuminHentai } from '$core/@types/HifuminHentai'

export const GET: RequestHandler = async event => {
  let query = event.url.searchParams.get('query')
  const page = event.url.searchParams.get('page')

  if (query === '') query = 'doujinshi'

  try {
    interface QueryResult {
      data: {
        nhql: {
          search: {
            data: HifuminHentai[]
          }
        }
      }
    }

    const {
      data: {
        nhql: {
          search: { data: searchResult },
        },
      },
    } = await fetch(env.HIFUMIN_API_URL, {
      body: JSON.stringify({
        query: `
        query RiffyHSearch($query: String!, $page: Int!) {
          nhql {
            search(with: $query, page: $page) {
              data {
                ${hifuminHentaiQuery}
              }
            }
          }
        }
      `,
        variables: {
          query: query as string,
          page: Number(page),
        },
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }).then(async o => {
      if (o.status === 200) {
        return o.json() as Promise<QueryResult>
      } else {
        console.log('status: ', o.status)
        throw new Error(await o.json())
      }
    })

    // convert
    const parsedGalleries = searchResult.map(item =>
      hentaiToMinifiedHentaiForListing(hifuminHentaiToHentai(item))
    )

    return json(
      {
        status: 'success',
        response: {
          data: {
            maxPage: 999,
            items: parsedGalleries,
          },
        },
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 's-maxage=300',
        },
      }
    )
  } catch (e) {
    console.log(e)
    return json(
      {
        status: 'failed',
        response: (e as Error)?.message ?? null,
      },
      {
        status: 500,
        headers: {
          'Cache-Control': 's-maxage=300',
        },
      }
    )
  }
}
