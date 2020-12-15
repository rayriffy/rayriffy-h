import { NextApiHandler } from 'next'
import getConfig from 'next/config'

import { chunk } from 'lodash'

import { codes } from '@rayriffy-h/datasource'
import { itemsPerPage } from '@rayriffy-h/constants'

interface IServerConfig {
  serverRuntimeConfig: {
    [key: string]: string
  }
  publicRuntimeConfig: {
    [key: string]: string
  }
}

const api: NextApiHandler = async (req, res) => {
  const { serverRuntimeConfig }: IServerConfig = getConfig()

  const buildId = serverRuntimeConfig.buildId
  const host = req.headers.host

  const codeChunks = chunk(codes, itemsPerPage)

  const urls = codeChunks.map((_, i) => {
    const page = i + 1
    return `${host}/_next/data/${buildId}/listing${
      page === 1 ? '' : `/p/${page}`
    }.json`
  })

  res.status(200).send({
    ok: true,
    data: JSON.stringify(urls),
  })
}

export default api
