import React from 'react'

import { NextPage, GetStaticProps } from 'next'

import { chunk, reverse, get } from 'lodash'

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
  // const fs = await import('fs')
  // const path = await import('path')

  const { codes } = await import('@rayriffy-h/datasource')

  const chunks = chunk(reverse(codes), itemsPerPage)

  const galleries = await Promise.all(
    get(chunks, 0).map(
      async code => await getHentai(typeof code === 'number' ? code : code.code)
    )
  )
  const filteredGalleries: Hentai[] = galleries.map(gallery => ({
    ...gallery,
    images: {
      ...gallery.images,
      pages: [],
    },
  }))

  // Dump data into cache
  // const cachePath

  return {
    props: {
      galleries: filteredGalleries,
      currentPage: 1,
      maxPage: chunks.length,
    },
  }
}

export default Page
