import { NextApiHandler } from 'next'

import { getHentai } from '../../../core/services/getHentai'

interface GalleryRequest {
  code: string
}

const api: NextApiHandler = async (req, res) => {
  const { code } = req.query as unknown as GalleryRequest

  // look for local cache
  const hentai = await getHentai(code)

  return res.send({
    message: 'ok',
    data: hentai,
  })
}

export default api
