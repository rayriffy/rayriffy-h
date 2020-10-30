import React, { useEffect } from 'react'

import { getImageUrl, Hentai } from '@rayriffy-h/helper'
import { useStoreon } from '@rayriffy-h/state-engine'

import { ImageBlur } from '../imageBlur'

interface IProps {
  hentai: Hentai
  excludes?: number[]
}

export const Reader: React.FC<IProps> = React.memo(props => {
  const { hentai, excludes = [] } = props

  const { dispatch } = useStoreon('history')

  useEffect(() => {
    dispatch('history/toggle', {
      internal: false,
      data: hentai,
    })
  }, [])

  return (
    <React.Fragment>
      <div className="max-w-3xl mx-auto block md:flex pt-0 md:pt-10">
        <div className="p-8 flex justify-center md:p-0">
          <div className="overflow-hidden rounded-md">
            <ImageBlur
              src={getImageUrl({
                image: hentai.images.cover,
                type: 'cover',
                mediaId: hentai.media_id,
              })}
              width={hentai.images.cover.w}
              height={hentai.images.cover.h}
            />
          </div>
        </div>
        <div className="text-gray-800 pl-6">
          <p className="font-semibold text-gray-500 text-md">{hentai.id}</p>
          <h1 className="font-bold text-2xl leading-tight py-2">
            {hentai.title.pretty}
          </h1>
          <h2 className="font-bold text-gray-500 text-md">
            {hentai.title.japanese}
          </h2>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-0 sm:px-4 lg:px-6 pt-6">
        <div className="max-w-xl mx-auto overflow-hidden">
          {hentai.images.pages.map((page, i) =>
            !excludes.includes(i + 1) ? (
              <ImageBlur
                key={`reader-${hentai.id}-page-${i + 1}`}
                src={getImageUrl({
                  image: page,
                  mediaId: hentai.media_id,
                  page: i + 1,
                  type: 'gallery',
                })}
                width={page.w}
                height={page.h}
                priority={i <= 1}
              />
            ) : null
          )}
        </div>
      </div>
    </React.Fragment>
  )
})
