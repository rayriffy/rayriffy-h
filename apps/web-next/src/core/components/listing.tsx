import React, { useMemo } from 'react'

import dynamic from 'next/dynamic'

import { columnShuffle, Hentai } from '@rayriffy-h/helper'

import { useMedia } from 'web-api-hooks'

import { Poster } from './poster'

interface IProps {
  galleries: Hentai[]
}

const Component: React.FC<IProps> = React.memo(props => {
  const { galleries } = props

  const mediaMd = useMedia('(min-width: 768px)')
  const mediaLg = useMedia('(min-width: 1024px)')
  const mediaXl = useMedia('(min-width: 1280px)')
  const media2Xl = useMedia('(min-width: 1536px)')

  const column = useMemo(
    () => (media2Xl ? 6 : mediaXl ? 5 : mediaLg ? 4 : mediaMd ? 3 : 2),
    [mediaLg, mediaMd, mediaXl, media2Xl]
  )

  return (
    <div className="flex flex-column flex-wrap">
      {columnShuffle(galleries, column).map((chunk, i) => (
        <section
          key={`listing-section-${i}`}
          className={
            column === 2
              ? 'w-1/2'
              : column === 3
              ? 'w-1/3'
              : column === 4
              ? 'w-1/4'
              : column === 5
              ? 'w-1/5'
              : 'w-1/6'
          }
        >
          {chunk.map(hentai => (
            <div key={`poster-${hentai.id}`} className="p-3 flex items-center">
              <Poster hentai={hentai} />
            </div>
          ))}
        </section>
      ))}
    </div>
  )
})

export const Listing = dynamic(async () => Component, {
  ssr: false,
})
