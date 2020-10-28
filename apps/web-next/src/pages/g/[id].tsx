import React from 'react'

import { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'

import useSWR from 'swr'

import {
  getImageUrl,
  rawHentaiToHentai,
  APIResponse,
  RawHentai,
} from '@rayriffy-h/helper'

interface IProps {
  id: string
}

const fetcher = url => fetch(url).then(r => r.json())

const useHentai = (id: number | string) => {
  const { data, error } = useSWR<APIResponse<RawHentai>>(
    `https://h.api.rayriffy.com/v1/gallery/${id}`,
    fetcher
  )

  return {
    hentai: data ? rawHentaiToHentai(data.response.data) : undefined,
    isLoading: !error && !data,
    isError: error,
  }
}

const Page: NextPage<IProps> = props => {
  const { id } = props

  const { hentai, isError } = useHentai(id)

  return (
    <React.Fragment>
      <div className="p-4">
        <div className="bg-gray-300 text-gray-700 text-sm p-4 rounded">
          {JSON.stringify(hentai)}
        </div>
      </div>
      {isError ? (
        <div className="pt-4">Failed</div>
      ) : !hentai ? (
        <div className="pt-4">Loading...</div>
      ) : (
        <div className="pt-4">
          <div className="max-w-lg mx-auto">
            {hentai.images.pages.map((page, i) => (
              <Image
                className="overflow-hidden"
                key={`reader-${hentai.id}-page-${i + 1}`}
                src={getImageUrl({
                  image: page,
                  mediaId: hentai.media_id,
                  page: i + 1,
                  type: 'gallery',
                })}
                width={page.w}
                height={page.h}
                priority={i <= 1}
              />
            ))}
          </div>
        </div>
      )}
    </React.Fragment>
  )
}

// export const getStaticProps: GetStaticProps = async context => {
export const getServerSideProps: GetServerSideProps = async context => {
  return {
    props: {
      id: context.params.id as string,
    },
  }
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   return {
//     paths: [
//       { params: { id: '299240' } },
//       { params: { id: '282649' } },
//       { params: { id: '272902' } },
//     ],
//     fallback: true,
//   }
// }

export default Page
