import React from 'react'

import { NextPage, GetStaticProps, GetStaticPaths } from 'next'

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
  const { codes } = await import('@rayriffy-h/datasource')

  const { params } = context
  const currentPage = Number(get(params, 'page[1]', '1'))

  const chunks = chunk(reverse(codes), itemsPerPage)

  const galleries = await Promise.all(
    get(chunks, currentPage - 1).map(
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
      currentPage,
      maxPage: chunks.length,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { codes } = await import('@rayriffy-h/datasource')

  const chunks = chunk(reverse(codes), itemsPerPage)

  return {
    paths: chunks
      .map((_, i) => {
        const page = i + 1

        return {
          params: {
            page: page === 1 ? [] : ['p', page.toString()],
          },
        }
      })
      .filter(o => o !== undefined),
    fallback: false,
  }
}

export default Page
