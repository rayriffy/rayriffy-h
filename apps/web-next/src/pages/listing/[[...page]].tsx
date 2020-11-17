import React from 'react'

import { NextPage, GetStaticProps, GetStaticPaths } from 'next'

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
  const { default: chain } = await import('lodash/chain')
  const { default: get } = await import('lodash/get')
  const { default: chunk } = await import('lodash/chunk')

  const { params } = context
  const currentPage = Number(get(params, 'page[1]', '1'))

  const galleries = await Promise.all(
    chain(codes)
      .reverse()
      .chunk(itemsPerPage)
      .get(currentPage - 1)
      .map(
        async code =>
          await getHentai(typeof code === 'number' ? code : code.code)
      )
      .value()
  )
  const filteredGalleries: Hentai[] = galleries.map(gallery => ({
    ...gallery,
    images: {
      ...gallery.images,
      pages: [],
    },
  }))

  return {
    props: {
      galleries: filteredGalleries,
      currentPage,
      maxPage: chunk(codes, itemsPerPage).length,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { codes } = await import('@rayriffy-h/datasource')
  const { default: chain } = await import('lodash/chain')

  return {
    paths: chain(codes)
      .chunk(itemsPerPage)
      .map((_, i) => {
        const page = i + 1

        return {
          params: {
            page: page === 1 ? [] : ['p', page.toString()],
          },
        }
      })
      .filter(o => o !== undefined)
      .value(),
    fallback: false,
  }
}

export default Page
