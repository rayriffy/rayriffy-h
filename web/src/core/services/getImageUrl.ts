import type { Image } from '@riffyh/commons'

export interface GetImageUrlArgs {
  image: Image
  mediaId: number | string
  page?: number
  type: 'cover' | 'thumbnail' | 'gallery'
}

export const getImageUrl = (args: GetImageUrlArgs): string => {
  const { image, type, mediaId, page } = args

  return `https://${
    type === 'gallery' ? 'i' : 't'
  }.nhentai.net/galleries/${mediaId}/${
    type === 'cover' ? 'cover' : `${page}${type === 'thumbnail' ? 't' : ''}`
  }.${image.t === 'p' ? 'png' : image.t === 'g' ? 'gif' : Number(mediaId) > 3110425 ? 'webp' : 'jpg'}`
}
