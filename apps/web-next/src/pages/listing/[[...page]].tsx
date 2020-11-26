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
  const { default: _ } = await import('lodash')
  const { default: get } = await import('lodash/get')
  const { getPage } = await import('../../core/services/getPage')

  const { params } = context
  const currentPage = Number(get(params, 'page[1]', '1'))

  const gallerieCodes = getPage(currentPage)

  const promises: Promise<Hentai>[] = []
  for (const code of gallerieCodes) {
    const gallery = getHentai(typeof code === 'number' ? code : code.code)
    promises.push(gallery)
  }

  const galleries = await Promise.all(promises)

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
      maxPage: _.chain(codes).chunk(itemsPerPage).value().length,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { codes } = await import('@rayriffy-h/datasource')
  const { default: _ } = await import('lodash')

  return {
    paths: _.chain(codes)
      .chunk(itemsPerPage)
      .map((_, i) => {
        const page = i + 1

        return {
          params: {
            page: page === 1 ? [] : ['p', page.toString()],
          },
        }
      })
      .value(),
    fallback: false,
  }
}

export default Page
