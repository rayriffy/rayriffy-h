import React from 'react'

import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'

import { HeadTitle } from '../../core/components/headTitle'

interface IProps {
  id: string | string[]
}

const Page: NextPage = props => {
  const router = useRouter()

  return (
    <React.Fragment>
      <HeadTitle />
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-800">
          POC of bug in getStaticProps fallback
        </h1>
        <p className="text-md text-gray-500">
          /1 /2 /3 is statically generated, this should work just fine, but for
          the rest of the page that needs fallback will crash on Vercel, but not
          on development.
        </p>
        <div className="pt-6">
          <div className="bg-gray-200 py-4 px-6 rounded-md">
            <h2 className="font-bold uppercase text-sm">Props</h2>
            <p className="text-sm text-gray-500 pt-1">
              {JSON.stringify(props)}
            </p>
          </div>
        </div>
        <div className="pt-6">
          <div className="bg-gray-200 py-4 px-6 rounded-md">
            <h2 className="font-bold uppercase text-sm">Router</h2>
            <p className="text-sm text-gray-500 pt-1">
              {JSON.stringify(router)}
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export const getStaticProps: GetStaticProps<IProps> = async context => {
  return {
    props: {
      id: context.params.id,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: { id: '1' },
      },
      {
        params: { id: '2' },
      },
      {
        params: { id: '3' },
      },
    ],
    fallback: true,
  }
}

export default Page
