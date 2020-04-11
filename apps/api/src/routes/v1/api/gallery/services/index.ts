import express from 'express'

import { getHentai } from '../functions/getHentai'

import { IHentai } from '../../../core/@types/IHentai'
import { IResponse } from '../../../core/@types/IResponse'

const router = express.Router()

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const data = await getHentai(id)

    const response: IResponse<IHentai> = {
      status: 'success',
      code: 201,
      response: {
        message: 'gallery obtained',
        data,
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
