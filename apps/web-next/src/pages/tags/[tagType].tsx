import { Fragment } from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Link from 'next/link'

import { Hentai, Tag } from '@rayriffy-h/helper'

import kebabCase from 'lodash/kebabCase'
import { HeadTitle } from '../../core/components/headTitle'

interface IProps {
  tags: Tag[]
}

const Page: NextPage<IProps> = props => {
  const { tags } = props

  return (
    <Fragment>
      <HeadTitle />
      <div className="pt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tags.map(tag => (
            <Link href={`/tag/${kebabCase(tag.name)}`} key={`tag-${tag.id}`}>
              <a className="bg-white px-4 py-3 shadow rounded-lg">{tag.name}</a>
            </Link>
          ))}
        </div>
      </div>
    </Fragment>
  )
}

export const getStaticProps: GetStaticProps<IProps> = async ctx => {
  const { default: fs } = await import('fs')
  const { default: path } = await import('path')
  const { default: sortBy } = await import('lodash/sortBy')

  const { promiseGunzip } = await import('../../core/services/promiseGunzip')

  const searchKeyFile = await promiseGunzip(
    fs.readFileSync(
      path.join(process.cwd(), 'apps/web-next/public/static', 'searchKey.opt')
    )
  )
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

  return {
    props: {
      tags: sortBy(
        tagPool.filter(tag => tag.type === ctx.params.tagType),
        ['name']
      ),
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { tags } = await import('@rayriffy-h/tags')

  return {
    paths: tags.map(tag => ({
      params: {
        tagType: tag.name,
      },
    })),
    fallback: false,
  }
}

export default Page
