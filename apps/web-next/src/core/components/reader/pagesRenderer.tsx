import { FunctionComponent, memo } from 'react'

import { getImageUrl, Image } from '@rayriffy-h/helper'

import { ImageBlur } from '../imageBlur'

interface IProps {
  pages: Image[]
  mediaId: string
  excludes: number[]
}

export const PagesRenderer = memo<IProps>(props => {
  const { pages, mediaId, excludes } = props

  return (
    <div className="max-w-7xl mx-auto px-0 sm:px-4 lg:px-6 pt-6">
      <div className="max-w-xl mx-auto overflow-hidden">
        {pages.map((page, i) =>
          !excludes.includes(i + 1) ? (
            <ImageBlur
              key={`reader-page-${i + 1}`}
              alt={`page ${i + 1}`}
              src={getImageUrl({
                image: page,
                mediaId: mediaId,
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
  )
})
