import sharp from 'sharp'
import { AVIF, JPEG, PNG, WEBP } from '../../constants/image/mimeTypes'

export const optimizeImage = async (
  buffer: Buffer,
  contentType: string,
  quality: number,
  width: number,
  height?: number
) => {
  // Begin sharp transformation logic
  const transformer = sharp(buffer)

  transformer.rotate()

  if (height) {
    transformer.resize(width, height)
  } else {
    const { width: metaWidth } = await transformer.metadata()

    if (metaWidth && metaWidth > width) {
      transformer.resize(width)
    }
  }

  if (contentType === AVIF) {
    if (transformer.avif) {
      const avifQuality = quality - 15
      transformer.avif({
        quality: Math.max(avifQuality, 0),
        chromaSubsampling: '4:2:0', // same as webp
      })
    } else {
      transformer.webp({ quality })
    }
  } else if (contentType === WEBP) {
    transformer.webp({ quality })
  } else if (contentType === PNG) {
    transformer.png({ quality })
  } else if (contentType === JPEG) {
    transformer.jpeg({ quality })
  }

  return transformer.toBuffer()
}
