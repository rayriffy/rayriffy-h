import React, { useEffect } from 'react'

import { Helmet } from 'react-helmet'
import {
  trackWindowScroll,
  LazyComponentProps,
} from 'react-lazy-load-image-component'

import { BluredImage } from '../bluredImage'
import { Slug } from '../slug'
import { Collapse } from './collapse'
import { Share } from './share'

import { useStoreon } from '../../../store'

import { getImageUrl } from '@rayriffy-h/helper'

import { tags as tagStack } from '../../../contents/database/tags'

import { filterTagByType } from '../../services/functions/filterTagByType'

import { ReaderProps } from '../../@types/ReaderProps'

const Component: React.FC<ReaderProps & LazyComponentProps> = props => {
  const { raw, internal = true, scrollPosition } = props

  const { dispatch } = useStoreon('history')

  const hentai = raw.raw

  useEffect(() => {
    dispatch('history/toggle', {
      internal,
      data: { ...hentai, images: { ...hentai.images, pages: [] } },
    })
  }, [])

  return (
    <div className="py-0 md:py-2">
      <Helmet title={hentai.title.pretty} />
      <div className="flex flex-wrap">
        <div className="w-full md:w-5/12 p-4">
          <div className="rounded-lg overflow-hidden">
            <BluredImage
              height={hentai.images.cover.h}
              width={hentai.images.cover.w}
              alt={`Cover ${hentai.title.pretty}`}
              scrollPosition={scrollPosition}
              src={getImageUrl({
                image: hentai.images.cover,
                mediaId: hentai.media_id,
                type: 'cover',
              })}
            />
          </div>
          <div className="pt-4 md:pt-8">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-white">
              <Share hentai={hentai} internal={internal} />
            </div>
          </div>
        </div>
        <div className="w-full md:w-7/12 pt-0 md:pt-4 px-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
            <div className="text-3xl font-semibold text-gray-900 dark:text-white leading-tight">
              {hentai.title.pretty}
            </div>
            <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 pt-2">
              {hentai.title.japanese}
            </div>
            <div className="pt-4">
              {tagStack.map(stack => {
                const res = filterTagByType(hentai.tags, stack.name)

                if (res.length !== 0) {
                  return (
                    <div key={`collapse-${hentai.id}-${stack.name}`}>
                      <div className="py-1">
                        <Collapse
                          title={stack.name}
                          defaultState={stack.name === 'tag'}
                        >
                          <div className="flex flex-wrap">
                            {res.map(tag => {
                              return (
                                <Slug
                                  key={`slug-${hentai.id}-${stack.name}-${tag.id}`}
                                  color={stack.color}
                                  link={`/${stack.prefix}/${tag.id}`}
                                  title={tag.name}
                                />
                              )
                            })}
                          </div>
                        </Collapse>
                      </div>
                    </div>
                  )
                } else {
                  return null
                }
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="pt-6 flex justify-center">
        <div className="w-full md:w-10/12 lg:w-8/12 xl:w-6/12">
          {hentai.images.pages.map((page, i) =>
            !raw.exclude.includes(i + 1) ? (
              <div
                className="overflow-hidden"
                key={`reader-${raw.raw.id}-page-${i + 1}`}
              >
                <BluredImage
                  height={page.h}
                  width={page.w}
                  alt={`Page ${i + 1}`}
                  scrollPosition={scrollPosition}
                  src={getImageUrl({
                    image: page,
                    mediaId: hentai.media_id,
                    page: i + 1,
                    type: 'gallery',
                  })}
                />
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  )
}

export const Reader = React.memo(trackWindowScroll(Component))
