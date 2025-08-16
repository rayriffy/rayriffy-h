import type { GetImageUrlArgs } from "../@types/GetImageUrlArgs";

export const getImageUrl = (args: GetImageUrlArgs, adoptWebp = true): string => {
  const { image, type, mediaId, page } = args

  return `https://${
    type === 'gallery' ? 'i' : 't'
  }4.nhentai.net/galleries/${mediaId}/${
    type === 'cover' ? 'cover' : `${page}${type === 'thumbnail' ? 't' : ''}`
  }.${image.t === 'p' ? 'png' : image.t === 'g' ? 'gif' : adoptWebp && Number(mediaId) > 3110425 ? 'webp' : 'jpg'}`
}
