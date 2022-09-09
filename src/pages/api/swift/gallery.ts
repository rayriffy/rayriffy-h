import { NextApiHandler } from 'next'

import { getHentai } from '../../../core/services/getHentai'

interface GalleryRequest {
  code: string
}

const api: NextApiHandler = async (req, res) => {
  const { code } = req.query as unknown as GalleryRequest

  // look for local cache
  const hentai = await getHentai(code)

  res.setHeader('Cache-Control', 's-maxage=2629800')
  return res.send({
    message: 'ok',
    data: hentai,
  })
}

export default api
