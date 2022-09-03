import { memo, Fragment, useEffect } from 'react'

import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

import { ImageBlur } from '../imageBlur'
import { TagRenderer } from './tagRenderer'
import { PagesRenderer } from './pagesRenderer'
import { SafeMode } from './safeMode'
import { Favorite } from './favorite'

import { Hentai } from '../../@types/Hentai'
import { useStoreon } from '../../../context'
import { getImageUrl } from '../../services/getImageUrl'

interface IProps {
  hentai: Hentai
  excludes?: number[]
}

export const Reader = memo<IProps>(props => {
  const { hentai, excludes = [] } = props

  const { dispatch } = useStoreon('history', 'metadata')

  useEffect(() => {
    dispatch('metadata/viewCount/count')
    dispatch('history/toggle', {
      internal: false,
      data: hentai,
    })
  }, [])

  return (
    <Fragment>
      <div className="max-w-3xl mx-auto block md:flex pt-0 md:pt-10">
        <div className="p-8 md:p-0 shrink-0">
          <div className="flex justify-center">
            <div className="overflow-hidden rounded-md">
              <ImageBlur
                src={getImageUrl({
                  image: hentai.images.cover,
                  type: 'cover',
                  mediaId: hentai.media_id,
                })}
                alt="cover"
                width={hentai.images.cover.w}
                height={hentai.images.cover.h}
              />
            </div>
          </div>
          <SafeMode />
        </div>
        <div className="text-gray-800 pl-6">
          <p className="font-semibold text-gray-500 text-md">{hentai.id}</p>
          <h1 className="font-bold text-2xl leading-tight pt-2 text-gray-700">
            {hentai.title.pretty}
          </h1>
          <h2 className="font-bold text-gray-500 text-md">
            {hentai.title.japanese}
          </h2>
          <span className="text-gray-500 text-sm font-bold">
            {hentai.images.pages.length - excludes.length} Pages
          </span>
          <TagRenderer tags={hentai.tags} />
          <div className="py-6 flex space-x-4">
            <Favorite hentai={hentai} />
            <a
              href={`/api/pdf/${hentai.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              PDF <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
      </div>
      <PagesRenderer
        pages={hentai.images.pages}
        mediaId={hentai.media_id}
        excludes={excludes}
      />
    </Fragment>
  )
})
