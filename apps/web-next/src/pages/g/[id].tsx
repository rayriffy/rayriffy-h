import React, { useEffect } from 'react'

import { getImageUrl } from '@rayriffy-h/helper'
import { ExclamationCircle } from '@rayriffy-h/icons'
import { useStoreon } from '@rayriffy-h/state-engine'

import { GetServerSideProps, NextPage } from 'next'

import { useHentai } from '../../core/services/useHentai'
import { ImageBlur } from '../../core/components/imageBlur'
import { Reader } from '../../core/components/reader'

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
    return <Reader {...{ hentai, excludes }} />
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

export const config = { amp: 'hybrid' }

export default Page
