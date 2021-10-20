import { Fragment } from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

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

export const getStaticProps: GetStaticProps<IProps> = async ctx => {
  const { default: fs } = await import('fs')
  const { default: path } = await import('path')

  const { default: chunk } = await import('lodash/chunk')
  const { default: kebabCase } = await import('lodash/kebabCase')

  const { itemsPerPage } = await import('@rayriffy-h/constants')

  const { promiseGunzip } = await import('../../core/services/promiseGunzip')

  const tagNameAndPage = ctx.params.tagNameAndPage as string[]

  const targetTag = tagNameAndPage[0]
  const targetPage = tagNameAndPage.length === 1 ? 1 : Number(tagNameAndPage.reverse()[0])

  const searchKeyFile = await promiseGunzip(fs.readFileSync(path.join(process.cwd(), 'apps/web-next/public/static', 'searchKey.opt')))
  const searchKey: Hentai[] = JSON.parse(searchKeyFile.toString())

  const filteredHentaiTagChunks = chunk(searchKey.filter(hentai => hentai.tags.map(tag => kebabCase(tag.name)).includes(targetTag)), itemsPerPage)

  return {
    props: {
      tagName: targetTag,
      galleries: filteredHentaiTagChunks[targetPage - 1],
      maxPage: filteredHentaiTagChunks.length,
      currentPage: targetPage,
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { default: fs } = await import('fs')
  const { default: path } = await import('path')

  const { default: chunk } = await import('lodash/chunk')
  const { default: kebabCase } = await import('lodash/kebabCase')

  const { itemsPerPage } = await import('@rayriffy-h/constants')

  const { promiseGunzip } = await import('../../core/services/promiseGunzip')

  const searchKeyFile = await promiseGunzip(fs.readFileSync(path.join(process.cwd(), 'apps/web-next/public/static', 'searchKey.opt')))
  const searchKey: Hentai[] = JSON.parse(searchKeyFile.toString())

  const tagPool: Tag[] = []
  searchKey.map(hentai => {
    hentai.tags.map(tag => {
      const targetTagPool = tagPool.find(pool => pool.id === tag.id)

      if (!targetTagPool) {
        tagPool.push(tag)
      }
    })
  })

  interface Command {
    tag: string
    page: number
  }

  const commands: Command[] = tagPool.map(tag => {
    return {
      tag: kebabCase(tag.name),
      page: chunk(searchKey.filter(hentai => hentai.tags.find(hentaiTag => hentaiTag.id === tag.id)), itemsPerPage).length
    }
  })

  const generatePages: string[][] = commands.map(command => Array.from({ length: command.page }).map((_, i) => {
    const page = i + 1

    if (page === 1) {
      return [command.tag]
    } else {
      return [command.tag, 'p', page.toString()]
    }
  })).flat()

  return {
    paths: generatePages.map(page => ({
      params: {
        tagNameAndPage: page,
      },
    })),
    fallback: false,
  }
}

export default Page
