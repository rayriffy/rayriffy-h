import { Fragment } from 'react'

import { NextPage, GetStaticProps, GetStaticPaths } from 'next'

import { Hentai } from '@rayriffy-h/helper'
import { itemsPerPage } from '@rayriffy-h/constants'

import { ListingModule } from '../../modules/listing/components'
import { HeadTitle } from '../../core/components/headTitle'

interface IProps {
  galleries: Hentai[]
  maxPage: number
  currentPage: number
}

const Page: NextPage<IProps> = props => {
  return (
    <Fragment>
      <HeadTitle />
      <ListingModule {...props} />
    </Fragment>
  )
}

export const getStaticProps: GetStaticProps<IProps> = async context => {
  const { codes } = await import('@rayriffy-h/datasource')

  const { default: _ } = await import('lodash')
  const { default: get } = await import('lodash.get')

  const { default: fs } = await import('fs')
  const { default: path } = await import('path')

  const { getPage } = await import('../../core/services/getPage')

  const { params } = context
  const currentPage = Number(get(params, 'page[1]', '1'))
  const maxPage = _.chain(codes).chunk(itemsPerPage).value().length

  const gallerieCodes = getPage(currentPage)

  const galleries = gallerieCodes.map(code => {
    const targetCode = typeof code === 'number' ? code : code.code

    const hentai: Hentai = JSON.parse(fs.readFileSync(path.join(process.cwd(), '.next', 'cache', 'hentai', `${targetCode}.json`)).toString())

    return hentai
  })

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
