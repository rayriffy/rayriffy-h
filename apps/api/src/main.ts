import cors from 'cors'
import express from 'express'

import { APIResponse } from '@rayriffy-h/helper'
import { v1 } from './routes'

const server = express()

server.use(cors())

server.get('/', async (_, res) => {
  const response: APIResponse<{ docs: string }> = {
    status: 'success',
    code: 201,
    response: {
      message: 'hello',
      data: {
        docs: 'https://github.com/rayriffy/rayriffy-h/tree/master/apps/api#api',
      },
    },
  }

  return res.status(200).send(response)
})

server.use('/v1', v1)

server.all('*', (_, res) => {
  const response: APIResponse<never> = {
    status: 'failed',
    code: 404,
    response: {
      message: 'route not found',
    },
  }

  return res.status(405).send(response)
})

server.listen(3000)

export default server
