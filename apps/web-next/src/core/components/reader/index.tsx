import React, { useEffect } from 'react'

import { getImageUrl, Hentai } from '@rayriffy-h/helper'
import { useStoreon } from '@rayriffy-h/state-engine'

import { ImageBlur } from '../imageBlur'
import { TagRenderer } from './tagRenderer'
import { PagesRenderer } from './pagesRenderer'
import { SafeMode } from './safeMode'

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
        <div className="p-8 md:p-0">
          <div className="flex justify-center">
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
          <SafeMode />
        </div>
        <div className="text-gray-800 pl-6">
          <p className="font-semibold text-gray-500 text-md">{hentai.id}</p>
          <h1 className="font-bold text-2xl leading-tight py-2 text-gray-700">
            {hentai.title.pretty}
          </h1>
          <h2 className="font-bold text-gray-500 text-md pb-2">
            {hentai.title.japanese}
          </h2>
          <TagRenderer tags={hentai.tags} />
        </div>
      </div>
      <PagesRenderer
        pages={hentai.images.pages}
        mediaId={hentai.media_id}
        excludes={excludes}
      />
    </React.Fragment>
  )
})
