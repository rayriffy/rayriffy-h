import React, { useContext, useEffect, useState } from 'react'

import { trackWindowScroll, LazyComponentProps } from 'react-lazy-load-image-component'
import { useMedia } from 'web-api-hooks'

import { Poster } from '../../../../core/components/poster'

import { Subtitle } from '../../../../store'

import { columnShuffle } from '../services/columnShuffle'

import { Props } from '../@types/Props'
import { Hentai } from '@rayriffy-h/helper'

const Page: React.FC<Props & LazyComponentProps> = props => {
  const { pageContext, scrollPosition } = props
  const { raw, page } = pageContext

  const [posterColumn, setPosterColumn] = useState<Hentai[][]>([[], [], []])
  const [_, setSubtitle] = useContext(Subtitle)

  const mediaMd = useMedia('(min-width: 768px)')
  const mediaLg = useMedia('(min-width: 1024px)')

  console.log([mediaMd, mediaLg])

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

  useEffect(() => {
    setSubtitle(`listing`)
  }, [])

  return (
    <div className='flex flex-column flex-wrap'>
      <div className='w-full md:w-1/2 lg:w-1/3 text-white'>
        {posterColumn[0].map(hentai => (
          <Poster key={`poster-${hentai.id}`} raw={hentai} scrollPosition={scrollPosition} />
        ))}
      </div>
      <div className='hidden md:block md:w-1/2 lg:w-1/3 text-white'>
        {posterColumn[1].map(hentai => (
          <Poster key={`poster-${hentai.id}`} raw={hentai} scrollPosition={scrollPosition} />
        ))}
      </div>
      <div className='hidden lg:block lg:w-1/3 text-white'>
        {posterColumn[2].map(hentai => (
          <Poster key={`poster-${hentai.id}`} raw={hentai} scrollPosition={scrollPosition} />
        ))}
      </div>
    </div>
  )
}

export default trackWindowScroll(Page)
