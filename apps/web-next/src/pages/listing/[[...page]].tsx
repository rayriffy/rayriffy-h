import React from 'react'

import { NextPage, GetStaticProps, GetStaticPaths } from 'next'

import { getHentai, Hentai } from '@rayriffy-h/helper'
import { itemsPerPage } from '@rayriffy-h/constants'

import { ListingModule } from '../../modules/listing/components'
import BuildManifestPlugin from 'next/dist/build/webpack/plugins/build-manifest-plugin'

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

  const { default: fs } = await import('fs')
  const { default: path } = await import('path')

  const { getPage } = await import('../../core/services/getPage')

  const { params } = context
  const currentPage = Number(get(params, 'page[1]', '1'))
  const maxPage = _.chain(codes).chunk(itemsPerPage).value().length

  const gallerieCodes = getPage(currentPage)

  const galleries = await Promise.all(
    gallerieCodes.map(code =>
      getHentai(typeof code === 'number' ? code : code.code, true)
    )
  )

  const cacheDir = path.join(process.cwd(), '.cache')
  const cachePageDir = path.join(cacheDir, 'pages')
  const pageFile = path.join(cachePageDir, `page-${currentPage}.json`)

  const filteredGalleries: Hentai[] = galleries.map(gallery => ({
    ...gallery,
    images: {
      ...gallery.images,
      pages: [],
    },
  }))

  // Dump files into cache
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir)
  }
  if (!fs.existsSync(cachePageDir)) {
    fs.mkdirSync(cachePageDir)
  }

  fs.writeFileSync(pageFile, JSON.stringify(filteredGalleries))

  return {
    props: {
      galleries: filteredGalleries,
      currentPage,
      maxPage: maxPage,
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
