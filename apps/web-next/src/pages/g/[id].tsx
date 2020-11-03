import React from 'react'

import { getHentai, Hentai } from '@rayriffy-h/helper'

import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import { Reader } from '../../core/components/reader'
import { HeadTitle } from '../../core/components/headTitle'
import { useRouter } from 'next/router'

interface IProps {
  gallery: Hentai
  excludes: number[]
  error?: Error
}

const Page: NextPage<IProps> = props => {
  const { gallery, excludes } = props

  const router = useRouter()

  if (router.isFallback) {
    return (
      <div className="pt-16">
        <div className="flex justify-center">
          <div className="w-8 h-8 spinner border-2" />
        </div>
        <div className="pt-2">
          <p className="font-bold text-lg text-gray-800 text-center">
            Obtaining data
          </p>
          <p className="text-sm text-gray-800 text-center">
            This should take only few seconds...
          </p>
        </div>
      </div>
    )
  } else {
    return (
      <React.Fragment>
        <HeadTitle title={gallery.title.pretty} />
        <Reader {...{ hentai: gallery, excludes }} />
      </React.Fragment>
    )
  }
}

export const getStaticProps: GetStaticProps = async context => {
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
  } catch {
    return {
      notFound: true,
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { codes } = await import('@rayriffy-h/datasource')

  return {
    paths: codes.map(code => ({
      params: {
        id: typeof code == 'number' ? code.toString() : code.code.toString(),
      },
    })),
    fallback: true,
  }
}

export default Page
