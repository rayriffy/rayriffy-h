import axios from 'axios'
import sharp from 'sharp'

export const processImage = async (targetUrl: string, ratio: number) => {
  const fetchedImageData = await axios
    .get(targetUrl, {
      responseType: 'arraybuffer',
    })
    .then(o => o.data)

  return sharp(fetchedImageData)
    .rotate(ratio > 1 ? 90 : 0)
    .jpeg({
      quality: 82,
      mozjpeg: true,
    })
    .toBuffer()
}
