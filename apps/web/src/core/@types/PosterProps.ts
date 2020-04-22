import { Hentai } from '@rayriffy-h/helper'
import { ScrollPosition } from 'react-lazy-load-image-component'

export interface PosterProps {
  raw: Hentai
  internal?: boolean
  scrollPosition?: ScrollPosition
}
