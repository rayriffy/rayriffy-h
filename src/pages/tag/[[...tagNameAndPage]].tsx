import { Fragment } from 'react'
import { GetServerSideProps, NextPage } from 'next'

import { HeadTitle } from '../../core/components/headTitle'
import { TagModule } from '../../modules/tag/components'
import { Hentai } from '../../core/@types/Hentai'
import { MinifiedHentaiForListing } from '../../core/@types/MinifiedHentaiForListing'
import { hentaiToMinifiedHentaiForListing } from '../../core/services/hentaiToMinifiedHentaiForListing'

interface IProps {
  tagName: string
  galleries: MinifiedHentaiForListing[]
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

  const { itemsPerPage } = await import('../../core/constants/itemsPerPage')
  const { promiseBrotliDecompress } = await import(
    '../../core/services/promiseBrotliDecompress'
  )

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
  const hentais: Hentai[] = await promiseBrotliDecompress(
    Buffer.from(arrayBuffer)
  ).then(o => JSON.parse(o.toString()))

  const filteredHentaiTagChunks = chunk(hentais, itemsPerPage)

  return {
    props: {
      tagName: targetTag,
      galleries: filteredHentaiTagChunks[targetPage - 1].map(o =>
        hentaiToMinifiedHentaiForListing(o)
      ),
      maxPage: filteredHentaiTagChunks.length,
      currentPage: targetPage,
    },
  }
}

export default Page
