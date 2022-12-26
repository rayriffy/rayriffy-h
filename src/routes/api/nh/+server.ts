import { json } from '@sveltejs/kit'

import { hifuminInstance } from '../../../core/constants/hifuminInstance'
import { hifuminHentaiQuery } from '../../../core/constants/hifuminHentaiQuery'

import { hentaiToMinifiedHentaiForListing } from '../../../core/services/hentaiToMinifiedHentaiForListing'
import { hifuminHentaiToHentai } from '../../../core/services/hifuminHentaiToHentai'

import type { AxiosError } from 'axios'
import type { RequestHandler } from './$types'
import type { HifuminHentai } from '../../../core/@types/HifuminHentai'

export const GET: RequestHandler = async event => {
  const query = event.url.searchParams.get('query')
  const page = event.url.searchParams.get('page')

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
        data: {
          nhql: {
            search: { data: searchResult },
          },
        },
      },
    } = await hifuminInstance.post<QueryResult>('', {
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
    return json(
      {
        status: 'failed',
        response: (e as AxiosError)?.response?.data ?? null,
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
