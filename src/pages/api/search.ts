import { NextApiHandler } from 'next'

import chunk from 'lodash/chunk'

import { searchHentai } from '../../core/services/searchHentai'
import { promiseBrotliDecompress } from '../../core/services/promiseBrotliDecompress'
import { APIResponse } from '../../core/@types/APIResponse'
import { Hentai } from '../../core/@types/Hentai'
import { itemsPerPage } from '../../core/constants/itemsPerPage'

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

    const rawCompressedData = await fetch(
      `${
        /localhost/.test(host) ? 'http://' : 'https://'
      }${host}/static/searchKey.opt`
    )
    const arrayBuffer = await rawCompressedData.arrayBuffer()
    const hentais: Hentai[] = await promiseBrotliDecompress(
      Buffer.from(arrayBuffer)
    ).then(o => JSON.parse(o.toString()))

    const targetPage = Number(page)
    const searchResult = await searchHentai(query as string, hentais)

    const payload: APIResponse<{
      galleries: Hentai[]
      maxPage: number
    }> = {
      status: 'success',
      code: 200,
      response: {
        message: 'query success',
        data: {
          galleries: searchResult
            .slice(itemsPerPage * (targetPage - 1), itemsPerPage * targetPage)
            .map(gallery => ({
              ...gallery,
              images: {
                ...gallery.images,
                pages: [],
              },
            })),
          maxPage: chunk(searchResult, itemsPerPage).length,
        },
      },
    }

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
