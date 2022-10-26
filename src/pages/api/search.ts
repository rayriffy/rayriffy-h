import fs from 'fs'
import path from 'path'

import { NextApiHandler } from 'next'

import chunk from 'lodash/chunk'

import { searchHentai } from '../../core/services/searchHentai'
import { promiseBrotliDecompress } from '../../core/services/promiseBrotliDecompress'
import { APIResponse } from '../../core/@types/APIResponse'
import { Hentai } from '../../core/@types/Hentai'
import { itemsPerPage } from '../../core/constants/itemsPerPage'
import { MinifiedHentaiForListing } from '../../core/@types/MinifiedHentaiForListing'
import { hentaiToMinifiedHentaiForListing } from '../../core/services/hentaiToMinifiedHentaiForListing'

const api: NextApiHandler = async (req, res) => {
  try {
    const { query, page } = req.query
    const host = req.headers.host

    if (query === '') {
      return res.status(400).send({
        status: 'failed',
        code: 400,
        response: {
          message: 'empty query',
        },
      })
    }

    const compressedData = fs.readFileSync(
      path.join(process.cwd(), 'public', 'static', 'searchKey.opt')
    )
    const hentais: Hentai[] = await promiseBrotliDecompress(
      compressedData
    ).then(o => JSON.parse(o.toString()))

    const targetPage = Number(page)
    const searchResult = searchHentai(query as string, hentais)

    const payload: APIResponse<{
      galleries: MinifiedHentaiForListing[]
      maxPage: number
    }> = {
      status: 'success',
      code: 200,
      response: {
        message: 'query success',
        data: {
          galleries: searchResult
            .slice(itemsPerPage * (targetPage - 1), itemsPerPage * targetPage)
            .map(gallery => hentaiToMinifiedHentaiForListing(gallery)),
          maxPage: chunk(searchResult, itemsPerPage).length,
        },
      },
    }

    res.setHeader('Cache-Control', 's-maxage=300')

    return res.status(200).send(payload)
  } catch (e) {
    const payload: APIResponse<never> = {
      status: 'failed',
      code: 501,
      response: {
        message: 'internal error',
      },
    }
    res.status(500).send(payload)

    throw e
  }
}

export default api
