import React from 'react'

import { getHentai, Hentai } from '@rayriffy-h/helper'

import { GetServerSideProps, NextPage } from 'next'

import { Reader } from '../../core/components/reader'
import { HeadTitle } from '../../core/components/headTitle'

interface IProps {
  gallery: Hentai
  excludes: number[]
  error?: Error
}

const Page: NextPage<IProps> = props => {
  const { gallery, excludes } = props

  return (
    <React.Fragment>
      <HeadTitle title={gallery.title.pretty}>
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
    </React.Fragment>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { codes } = await import('@rayriffy-h/datasource')

  try {
    // Find exclude properties
    const result = codes.find(o =>
      typeof o === 'number' ? false : o.code.toString() === context.params.id
    )

    const hentai = await getHentai(context.params.id as string)

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
    console.error(e)

    return {
      notFound: true,
    }
  }
}

export default Page
