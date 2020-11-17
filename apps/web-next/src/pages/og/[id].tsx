import React from 'react'

import { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'

import { getImageUrl, Hentai } from '@rayriffy-h/helper'

import { TagRenderer } from '../../core/components/reader/tagRenderer'

interface IProps {
  gallery: Hentai
}

const Page: NextPage<IProps> = props => {
  const { gallery } = props

  return (
    <div className="w-screen h-screen px-20 py-10 bg-gradient-to-tr from-blue-100 to-teal-50">
      <div className="grid grid-cols-3 gap-8 w-full h-full">
        <div className="col-span-1 flex items-center justify-center">
          <div className="transform -rotate-2 w-full" id="image-cover">
            <Image
              src={getImageUrl({
                image: gallery.images.cover,
                mediaId: gallery.media_id,
                type: 'cover',
              })}
              className="rounded-lg"
              width={gallery.images.cover.w}
              height={gallery.images.cover.h}
            />
          </div>
        </div>
        <div className="col-span-2 px-8 py-8 space-y-4">
          <div>
            <h2 className="font-semibold text-2xl text-gray-500">
              {gallery.id}
            </h2>
            <h1 className="font-bold text-4xl text-gray-900 leading-tight">
              {gallery.title.pretty}
            </h1>
            <h3 className="font-medium text-xl text-gray-500 pt-2">
              {gallery.title.japanese}
            </h3>
          </div>
          <div>
            <TagRenderer tags={gallery.tags} />
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<IProps> = async context => {
  const { getHentaiFromCache } = await import(
    '../../core/services/getHentaiFromCache'
  )

  try {
    const hentai = await getHentaiFromCache(context.params.id as string)

    return {
      props: {
        gallery: hentai,
      },
    }
  } catch {
    return {
      notFound: true,
    }
  }
}

export default Page
