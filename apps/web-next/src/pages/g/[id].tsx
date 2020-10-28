import React from 'react'

import { getImageUrl } from '@rayriffy-h/helper'
import { ExclamationCircle } from '@rayriffy-h/icons'
import { useStoreon } from '@rayriffy-h/state-engine'

import { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'

import { useHentai } from '../../core/services/useHentai'

interface IProps {
  id: string
}

const Page: NextPage<IProps> = props => {
  const { id } = props

  const { hentai, isError } = useHentai(id)
  const { settings } = useStoreon('settings')

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
      <div className="pt-4">
        <div className="max-w-7xl mx-auto px-0 sm:px-4 lg:px-6">
          <div className="max-w-xl mx-auto overflow-hidden">
            {hentai.images.pages.map((page, i) => (
              <Image
                className={`overflow-hidden ${
                  settings.safemode ? 'filter-blur transform scale-105' : ''
                }`}
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
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export const getServerSideProps: GetServerSideProps = async context => {
  return {
    props: {
      id: context.params.id as string,
    },
  }
}

export default Page
