import { Image } from '../../../core/@types/Image'

export interface ProcessedImage {
  page: number
  image: Image
  data: Buffer
}
