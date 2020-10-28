import React from 'react'

import { NextPage, GetStaticProps } from 'next'

import { chunk, reverse } from 'lodash'

import { getHentai, Hentai } from '@rayriffy-h/helper'
import { itemsPerPage } from '@rayriffy-h/constants'

import { Listing } from '../core/components/listing'

interface IProps {
  galleries: Hentai[]
}

const Page: NextPage<IProps> = props => {
  const { galleries } = props

  return (
    <div className="p-6">
      <Listing {...{ galleries }} />
    </div>
  )
}

export const getStaticProps: GetStaticProps<IProps> = async context => {
  const { codes } = await import('@rayriffy-h/datasource')

  const firstChunk = await Promise.all(
    chunk(reverse(codes), itemsPerPage)[0].map(async code =>
      getHentai(typeof code === 'number' ? code : code.code)
    )
  )

  return {
    props: {
      galleries: firstChunk,
    },
  }
}

export default Page
