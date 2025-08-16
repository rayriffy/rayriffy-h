import type { Image } from "../@types/Image";

export interface GetImageUrlArgs {
  image: Image
  mediaId: number | string
  page?: number
  type: 'cover' | 'thumbnail' | 'gallery'
}