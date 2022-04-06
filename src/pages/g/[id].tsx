import { Fragment } from 'react'

import { GetServerSideProps, NextPage } from 'next'

import { Reader } from '../../core/components/reader'
import { HeadTitle } from '../../core/components/headTitle'

import { Hentai } from '../../core/@types/Hentai'

interface IProps {
  gallery: Hentai
  excludes: number[]
  error?: Error
}

const Page: NextPage<IProps> = props => {
  const { gallery, excludes } = props

  return (
    <Fragment>
      <HeadTitle
        title={gallery.title.pretty}
        description={`Read ${gallery.title.pretty} without ads or popups via Riffy H, an alternate client for nhentai`}
      >
        <meta
          property="og:image"
          content={`https://h.api.rayriffy.com/v1/og/${gallery.id}`}
        />
        <meta
          property="twitter:image"
          content={`https://h.api.rayriffy.com/v1/og/${gallery.id}`}
        />
      </HeadTitle>
      <Reader {...{ hentai: gallery, excludes }} />
    </Fragment>
  )
}

export const getServerSideProps: GetServerSideProps<IProps> = async context => {
  const { codes } = await import('../../core/constants/codes')
  const { ignoreList } = await import('../../core/constants/ignoreList')

  const { getHentai } = await import('../../core/services/getHentai')

  try {
    // Find exclude properties
    const targetId = context.params.id as string
    const result = codes.find(o =>
      typeof o === 'number' ? false : o.code.toString() === targetId
    )

    if (ignoreList.map(o => o.toString()).includes(targetId)) {
      return {
        notFound: true,
      }
    }

    const hentai = await getHentai(targetId)

    context.res.setHeader('Cache-Control', 's-maxage=604800')

    return {
      props: {
        gallery: hentai,
        excludes:
          result !== undefined
            ? typeof result === 'number'
              ? []
              : result.exclude
            : [],
      },
    }
  } catch (e) {
    return {
      notFound: true,
    }
  }
}

export default Page
