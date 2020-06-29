import React, { useEffect, useState } from 'react'

import {
  trackWindowScroll,
  LazyComponentProps,
} from 'react-lazy-load-image-component'
import { useMedia } from 'web-api-hooks'

import { Poster } from './poster'

import { columnShuffle } from '../services/functions/columnShuffle'

import { ListingHentai } from '../@types/ListingHentai'

interface Props {
  raw: ListingHentai[]
}

const Component: React.FC<Props & LazyComponentProps> = props => {
  const { raw, scrollPosition } = props

  const [posterColumn, setPosterColumn] = useState<ListingHentai[][]>([
    [],
    [],
    [],
  ])

  const mediaMd = useMedia('(min-width: 768px)')
  const mediaLg = useMedia('(min-width: 1024px)')

  useEffect(() => {
    if (mediaLg) {
      setPosterColumn(columnShuffle<ListingHentai>(raw, 3))
    } else if (mediaMd) {
      setPosterColumn([...columnShuffle<ListingHentai>(raw, 2), []])
    } else {
      setPosterColumn([...columnShuffle<ListingHentai>(raw, 1), [], []])
    }
  }, [mediaMd, mediaLg, raw])

  return (
    <div className="flex flex-column flex-wrap">
      <section className="w-full md:w-1/2 lg:w-1/3">
        {posterColumn[0].map(hentai => (
          <Poster
            key={`poster-${hentai.raw.id}`}
            raw={hentai.raw}
            internal={hentai.internal}
            {...{ scrollPosition }}
          />
        ))}
      </section>
      <section className="hidden md:block md:w-1/2 lg:w-1/3">
        {posterColumn[1].map(hentai => (
          <Poster
            key={`poster-${hentai.raw.id}`}
            raw={hentai.raw}
            internal={hentai.internal}
            {...{ scrollPosition }}
          />
        ))}
      </section>
      <section className="hidden lg:block lg:w-1/3">
        {posterColumn[2].map(hentai => (
          <Poster
            key={`poster-${hentai.raw.id}`}
            raw={hentai.raw}
            internal={hentai.internal}
            {...{ scrollPosition }}
          />
        ))}
      </section>
    </div>
  )
}

export const Listing = trackWindowScroll(Component)
