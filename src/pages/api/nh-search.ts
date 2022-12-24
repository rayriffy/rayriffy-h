import { NextApiHandler } from 'next'

import { hifuminHentaiQuery } from '../../core/constants/hifuminHentaiQuery'
import { hifuminInstance } from '../../core/constants/hifuminInstance'

import { hifuminHentaiToHentai } from '../../core/services/hifuminHentaiToHentai'
import { hentaiToMinifiedHentaiForListing } from '../../core/services/hentaiToMinifiedHentaiForListing'

import { HifuminHentai } from '../../core/@types/HifuminHentai'

const api: NextApiHandler = async (req, res) => {
  const { query, page } = req.query

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

    res.setHeader('Cache-Control', 's-maxage=300')

    return res.status(200).send({
      status: 'success',
      response: {
        data: {
          maxPage: 999,
          items: parsedGalleries,
        },
      },
    })
  } catch (e) {
    return res.status(500).send({
      status: 'failed',
      response: e.response.data,
    })
  }
}

export default api
