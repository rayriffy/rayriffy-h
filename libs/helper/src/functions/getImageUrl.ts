import { Image } from '../@types/Image'

export interface GetImageUrlArgs {
  image: Image
  mediaId: number | string
  page?: number
  type: 'cover' | 'thumbnail' | 'gallery'
}

export const getImageUrl = (args: GetImageUrlArgs): string => {
  const { image, type, mediaId, page } = args

  return `https://${type === 'cover' ? 't' : 'i'}.nhentai.net/galleries/${mediaId}/${type === 'cover' ? 'cover' : page}.${image.t === 'p' ? 'png' : image.t === 'g' ? 'gif' : 'jpg'}`
}
