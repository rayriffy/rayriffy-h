import fs from 'fs'
import path from 'path'

import axios from 'axios'
import { NextApiHandler } from 'next'

import { hifuminHentaiQuery } from '../../../core/constants/hifuminHentaiQuery'
import { itemsPerPage } from '../../../core/constants/itemsPerPage'

import { getPage } from '../../../core/services/getPage'
import { searchHentai } from '../../../core/services/searchHentai'
import { hifuminHentaiToHentai } from '../../../core/services/hifuminHentaiToHentai'
import { promiseBrotliDecompress } from '../../../core/services/promiseBrotliDecompress'

import { HifuminHentai } from '../../../core/@types/HifuminHentai'
import { Hentai } from '../../../core/@types/Hentai'

interface ListingRequest {
  mode: 'nhentai' | 'listing'
  query: string
  page: string
}

const api: NextApiHandler = async (req, res) => {
  const { mode, query = '', page } = req.query as unknown as ListingRequest

  const numberizedPage = Number(page)

  if (mode === 'nhentai') {
    /**
     * MODE 1: Listing with NHentai
     */

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
    } = await axios.post<QueryResult>(process.env.HIFUMIN_API_URL, {
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
        page: numberizedPage,
      },
    })

    const parsedGalleries: Hentai[] = searchResult
      .map(item => hifuminHentaiToHentai(item))
      .map(o => ({
        ...o,
        images: {
          ...o.images,
          pages: [],
        },
      }))

    return res.send({
      message: 'ok',
      data: parsedGalleries,
    })
  } else {
    /**
     * MODE 2: Listing with local lists
     */

    if (query.length === 0) {
      // Part 1: Regular listing
      // if there's no any quries then listing as normal without search

      const codes = getPage(numberizedPage)

      const galleries = codes.map(code => {
        const targetCode = typeof code === 'number' ? code : code.code

        const hentai: Hentai = JSON.parse(
          fs
            .readFileSync(
              path.join(
                process.cwd(),
                '.next',
                'cache',
                'hentai',
                `${targetCode}.json`
              )
            )
            .toString()
        )

        return hentai
      })

      const filteredGalleries: Hentai[] = galleries.map(gallery => ({
        ...gallery,
        images: {
          ...gallery.images,
          pages: [],
        },
      }))

      return res.send({
        message: 'ok',
        data: filteredGalleries,
      })
    } else {
      // Part 2: Search listing
      // search any listing

      const compressedData = fs.readFileSync(
        path.join(process.cwd(), 'public', 'static', 'searchKey.opt')
      )
      const hentais: Hentai[] = await promiseBrotliDecompress(
        compressedData
      ).then(o => JSON.parse(o.toString()))
      const searchResult = searchHentai(query as string, hentais)
        .slice(
          itemsPerPage * (numberizedPage - 1),
          itemsPerPage * numberizedPage
        )
        .map(gallery => ({
          ...gallery,
          images: {
            ...gallery.images,
            pages: [],
          },
        }))

      return res.send({
        message: 'ok',
        data: searchResult,
      })
    }
  }
}

export default api
