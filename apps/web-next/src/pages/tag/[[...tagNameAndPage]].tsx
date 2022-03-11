import { Fragment } from 'react'
import { GetServerSideProps, NextPage } from 'next'

import { Hentai } from '@rayriffy-h/helper'

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
  const { default: chunk } = await import('lodash/chunk')

  const { itemsPerPage } = await import('@rayriffy-h/constants')

  const { promiseGunzip } = await import('../../core/services/promiseGunzip')

  const tagNameAndPage = ctx.params.tagNameAndPage as string[]

  const targetTag = tagNameAndPage[0]
  const targetPage =
    tagNameAndPage.length === 1 ? 1 : Number(tagNameAndPage.reverse()[0])

  const urls = new URL(ctx.req.url, `http://${ctx.req.headers.host}`)

  const rawCompressedData = await fetch(
    `${/localhost/.test(urls.host) ? 'http://' : 'https://'}${
      urls.host
    }/static/key/${targetTag}.opt`
  )
  const arrayBuffer = await rawCompressedData.arrayBuffer()
  const hentais: Hentai[] = await promiseGunzip(Buffer.from(arrayBuffer)).then(
    o => JSON.parse(o.toString())
  )

  const filteredHentaiTagChunks = chunk(hentais, itemsPerPage)

  return {
    props: {
      tagName: targetTag,
      galleries: filteredHentaiTagChunks[targetPage - 1],
      maxPage: filteredHentaiTagChunks.length,
      currentPage: targetPage,
    },
  }
}

export default Page
