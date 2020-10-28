import React from 'react'

import { NextPage, GetStaticProps, GetStaticPaths } from 'next'

import { chunk, reverse } from 'lodash'

import { getHentai, Hentai } from '@rayriffy-h/helper'
import { itemsPerPage } from '@rayriffy-h/constants'

import { ListingModule } from '../../../modules/listing/components'

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
    chunks[Number(context.params.page) - 1].map(
      async code => await getHentai(typeof code === 'number' ? code : code.code)
    )
  )

  return {
    props: {
      galleries,
      currentPage: Number(context.params.page),
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

        if (page === 1) {
          return undefined
        } else {
          return {
            params: {
              page: page.toString(),
            },
          }
        }
      })
      .filter(o => o !== undefined),
    fallback: false,
  }
}

export default Page
