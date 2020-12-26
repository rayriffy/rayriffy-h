import { NextApiHandler } from 'next'

import { chunk, get } from 'lodash'

import { APIResponse, Hentai } from '@rayriffy-h/helper'
import { itemsPerPage } from '@rayriffy-h/constants'

import { searchHentai } from '../../core/services/searchHentai'

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

    const hentais: Hentai[] = await fetch(
      `${
        /localhost/.test(host) ? 'http://' : 'https://'
      }${host}/static/searchKey.json`
    ).then(o => o.json())

    const targetPage = Number(page)
    const searchResult = await searchHentai(query as string, hentais)

    const chunks = chunk(searchResult, itemsPerPage)

    const payload: APIResponse<{
      galleries: Hentai[]
      maxPage: number
    }> = {
      status: 'success',
      code: 200,
      response: {
        message: 'query success',
        data: {
          galleries: get<Hentai[][], number, Hentai[]>(
            chunks,
            targetPage - 1,
            []
          ).map(gallery => ({
            ...gallery,
            images: {
              ...gallery.images,
              pages: [],
            },
          })),
          maxPage: chunks.length,
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
