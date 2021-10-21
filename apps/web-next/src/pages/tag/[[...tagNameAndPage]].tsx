import { Fragment } from 'react'
import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from 'next'

import { Hentai, Tag } from '@rayriffy-h/helper'

import { HeadTitle } from '../../core/components/headTitle'
import { TagModule } from '../../modules/tag/components'

interface IProps {
  tagName: string
  galleries: Hentai[]
  maxPage: number
  currentPage: number
}

const Page: NextPage<IProps> = props => {
  return (
    <Fragment>
      <HeadTitle />
      <TagModule {...props} />
    </Fragment>
  )
}

export const getServerSideProps: GetServerSideProps<IProps> = async ctx => {
  const { default: fs } = await import('fs')
  const { default: path } = await import('path')

  const { default: chunk } = await import('lodash/chunk')
  const { default: kebabCase } = await import('lodash/kebabCase')

  const { itemsPerPage } = await import('@rayriffy-h/constants')

  const { promiseGunzip } = await import('../../core/services/promiseGunzip')

  try {
    const tagNameAndPage = ctx.params.tagNameAndPage as string[]

    const targetTag = tagNameAndPage[0]
    const targetPage =
      tagNameAndPage.length === 1 ? 1 : Number(tagNameAndPage.reverse()[0])

    const searchKeyFile = await promiseGunzip(
      fs.readFileSync(path.join(process.cwd(), '.next/cache', 'searchKey.opt'))
    )
    const searchKey: Hentai[] = JSON.parse(searchKeyFile.toString())

    const filteredHentaiTagChunks = chunk(
      searchKey.filter(hentai =>
        hentai.tags.map(tag => kebabCase(tag.name)).includes(targetTag)
      ),
      itemsPerPage
    )

    if (filteredHentaiTagChunks[targetPage - 1] === undefined) {
      return {
        notFound: true
      }
    } else {
      return {
        props: {
          tagName: targetTag,
          galleries: filteredHentaiTagChunks[targetPage - 1],
          maxPage: filteredHentaiTagChunks.length,
          currentPage: targetPage,
        },
      }
    }
  } catch (e) {
    return {
      notFound: true,
    }
  }
}

export default Page
