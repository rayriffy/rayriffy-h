import express from 'express'

import { getRawHentai, RawHentai, APIResponse } from '@rayriffy-h/helper'

const router = express.Router()

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const data = await getRawHentai(id, true)

    const response: APIResponse<RawHentai> = {
      status: 'success',
      code: 201,
      response: {
        message: 'gallery obtained',
        data,
      },
    }

    return res.status(200).send(response)
  } catch (e) {
    const response: APIResponse<string> = {
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
  const response: APIResponse<never> = {
    status: 'failed',
    code: 404,
    response: {
      message: 'invalid method',
    },
  }

  res.status(405).send(response)
})

export default router
