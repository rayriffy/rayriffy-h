import React from 'react'

import { NextPage, GetStaticProps, GetStaticPaths } from 'next'

import { chunk, reverse } from 'lodash'

import { getHentai, Hentai } from '@rayriffy-h/helper'
import { itemsPerPage } from '@rayriffy-h/constants'

import { ListingModule } from '../../modules/listing/components'

interface IProps {
  galleries: Hentai[]
  maxPage: number
  currentPage: number
}

const Page: NextPage<IProps> = props => {
  return <ListingModule {...props} />
}

export const getStaticProps: GetStaticProps<IProps> = async context => {
  const { codes } = await import('@rayriffy-h/datasource')

  const chunks = chunk(reverse(codes), itemsPerPage)

  const galleries = await Promise.all(
    chunks[0].map(
      async code =>
        await getHentai(typeof code === 'number' ? code : code.code, true)
    )
  )

  return {
    props: {
      galleries,
      currentPage: 1,
      maxPage: chunks.length,
    },
  }
}

export default Page
