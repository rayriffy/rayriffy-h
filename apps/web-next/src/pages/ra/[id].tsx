import React from 'react'

import {
  NextPage,
  GetStaticProps,
  GetServerSideProps,
  GetStaticPaths,
} from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { getHentai, Hentai, getImageUrl } from '@rayriffy-h/helper'

interface IProps {
  hentai: Hentai
}

const Page: NextPage<IProps> = props => {
  const { hentai } = props

  const router = useRouter()

  return (
    <React.Fragment>
      <div className="p-4">
        <div className="bg-gray-300 text-gray-700 text-sm p-4 rounded">
          {JSON.stringify(props)}
        </div>
      </div>
      <div className="pt-4">
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
    </React.Fragment>
  )
}

// export const getStaticProps: GetStaticProps = async context => {
export const getServerSideProps: GetServerSideProps = async context => {
  const hentai = await getHentai(context.params.id as string)

  return {
    props: {
      hentai,
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
//     fallback: 'blocking',
//   }
// }

export default Page
