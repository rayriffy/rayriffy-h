import express from 'express'

import { getImageFunction } from '../functions/getImage'

import { IResponse } from '../../../core/@types/IResponse'

const router = express.Router()

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const image = await getImageFunction(id)

    const response: IResponse<string> = {
      status: 'success',
      code: 201,
      response: {
        message: 'image encoded',
        data: `data:image/jpeg;base64,${image}`,
      },
    }

    return res.status(200).send(response)
  } catch (e) {
    const response: IResponse<any> = {
      status: 'failed',
      code: 407,
      response: {
        message: 'puppeteer crash',
        data: e,
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
