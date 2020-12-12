import { NextApiHandler } from 'next'

import { APIResponse, Hentai } from '@rayriffy-h/helper'

import { searchHentai } from '../../core/services/searchHentai'

const api: NextApiHandler = async (req, res) => {
  try {
    const { query } = req.query
    const host = req.headers.host

    const hentais: Hentai[] = await fetch(
      `${host}/static/searchKey.json`
    ).then(o => o.json())

    const searchResult = await searchHentai(query as string, hentais)

    const payload: APIResponse<Hentai[]> = {
      status: 'success',
      code: 200,
      response: {
        message: 'query success',
        data: searchResult,
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
