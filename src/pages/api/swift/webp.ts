import { NextApiHandler } from 'next'

import axios from 'axios'
import sharp from 'sharp'

interface WebpRequest {
  url: string
  w: string
  q: string
}

const api: NextApiHandler = async (req, res) => {
  const { url, w = 800, q = 75 } = req.query as unknown as WebpRequest

  const imageRequest = await axios.get(url, {
    responseType: 'arraybuffer',
  })

  const processedImage = await sharp(imageRequest.data)
    .resize(Number(w))
    .webp({
      quality: Number(q),
    })
    .toBuffer()

  res.setHeader('Content-Type', 'image/webp')
  res.setHeader('Cache-Control', 'public, max-age=2629800')
  return res.send(processedImage)
}

export default api
