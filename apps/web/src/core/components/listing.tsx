import React, { useEffect, useState } from 'react'

import { trackWindowScroll, LazyComponentProps } from 'react-lazy-load-image-component'
import { useMedia } from 'web-api-hooks'

import { Poster } from './poster'

import { columnShuffle } from '../services/functions/columnShuffle'

import { Hentai } from '@rayriffy-h/helper'

interface Props {
  raw: Hentai[]
}

const Component: React.FC<Props & LazyComponentProps> = props => {
  const { raw, scrollPosition } = props

  const [posterColumn, setPosterColumn] = useState<Hentai[][]>([[], [], []])

  const mediaMd = useMedia('(min-width: 768px)')
  const mediaLg = useMedia('(min-width: 1024px)')

  useEffect(() => {
    console.log('call')
    if (mediaLg) {
      setPosterColumn(columnShuffle(raw, 3))
    } else if (mediaMd) {
      setPosterColumn([...columnShuffle(raw, 2), []])
    } else {
      setPosterColumn([...columnShuffle(raw, 1), [], []])
    }
  }, [mediaMd, mediaLg])

  return (
    <div className='flex flex-column flex-wrap'>
      <div className='w-full md:w-1/2 lg:w-1/3'>
        {posterColumn[0].map(hentai => (
          <Poster key={`poster-${hentai.id}`} raw={hentai} scrollPosition={scrollPosition} />
        ))}
      </div>
      <div className='hidden md:block md:w-1/2 lg:w-1/3'>
        {posterColumn[1].map(hentai => (
          <Poster key={`poster-${hentai.id}`} raw={hentai} scrollPosition={scrollPosition} />
        ))}
      </div>
      <div className='hidden lg:block lg:w-1/3'>
        {posterColumn[2].map(hentai => (
          <Poster key={`poster-${hentai.id}`} raw={hentai} scrollPosition={scrollPosition} />
        ))}
      </div>
    </div>
  )
}

export const Listing = trackWindowScroll(Component)
