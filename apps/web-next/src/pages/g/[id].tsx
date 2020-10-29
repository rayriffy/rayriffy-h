import React from 'react'

import { getImageUrl } from '@rayriffy-h/helper'
import { ExclamationCircle } from '@rayriffy-h/icons'

import { GetServerSideProps, NextPage } from 'next'

import { useHentai } from '../../core/services/useHentai'
import { ImageBlur } from '../../core/components/imageBlur'

interface IProps {
  id: string
  excludes: number[]
  error?: Error
}

const Page: NextPage<IProps> = props => {
  const { id, excludes } = props

  const { hentai, isError } = useHentai(id)

  if (isError) {
    return (
      <div className="pt-16">
        <div className="flex justify-center">
          <ExclamationCircle className="w-10 h-10" />
        </div>
        <div className="pt-2">
          <p className="font-bold text-lg text-gray-800 text-center">Failed</p>
          <p className="text-sm text-gray-800 text-center">
            I cannot find your gallery for this time (may be it's not exist)
          </p>
        </div>
      </div>
    )
  } else if (!hentai) {
    return (
      <div className="pt-16">
        <div className="flex justify-center">
          <div className="w-8 h-8 spinner border-2" />
        </div>
        <div className="pt-2">
          <p className="font-bold text-lg text-gray-800 text-center">
            Obtaining data
          </p>
          <p className="text-sm text-gray-800 text-center">
            This should take only few seconds...
          </p>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <div className="max-w-3xl mx-auto block md:flex pt-0 md:pt-6">
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
      </div>
    )
  }
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { codes } = await import('@rayriffy-h/datasource')

  // Find exclude properties
  const result = codes.find(o =>
    typeof o === 'number' ? false : o.code.toString() === context.params.id
  )

  return {
    props: {
      id: context.params.id as string,
      excludes:
        result !== undefined
          ? typeof result === 'number'
            ? []
            : result.exclude
          : [],
    },
  }
}

export default Page
