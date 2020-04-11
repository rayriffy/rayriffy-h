import express from 'express'

import { rawProcessor } from '../../../core/functions/rawProcessor'
import { getRelated } from '../functions/getRelated'

import { IHentai } from '../../../core/@types/IHentai'
import { IResponse } from '../../../core/@types/IResponse'

const router = express.Router()

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const data = await getRelated(id)

    const response: IResponse<IHentai[]> = {
      status: 'success',
      code: 201,
      response: {
        message: 'related gallery obtained',
        data: data.map(o => rawProcessor(o)),
      },
    }

    return res.status(200).send(response)
  } catch (e) {
    const response: IResponse<string> = {
      status: 'failed',
      code: 407,
      response: {
        message: 'unable to catch response',
        data: e.message,
      },
    }

    return res.status(400).send(response)
  }
})

router.all('/:id', (_, res) => {
  const response: IResponse<never> = {
    status: 'failed',
    code: 404,
    response: {
      message: 'invalid method',
    },
  }

  res.status(405).send(response)
})

export default router
