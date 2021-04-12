import React from 'react'

import { NextPage } from 'next'
import Link from 'next/link'
import dynamic from 'next/dynamic'

import { HeadTitle } from '../../core/components/headTitle'

// import { CollectionListing } from '../../modules/collection/components/listing'

const CollectionListing = dynamic(
  () =>
    import('../../modules/collection/components/listing').then(
      o => o.CollectionListing
    ),
  {
    ssr: false,
  }
)

const Page: NextPage = props => {
  return (
    <React.Fragment>
      <HeadTitle />
      <div className="p-2 sm:p-4">
        <div className="md:flex md:items-center md:justify-between pt-6 pb-2">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate">
              Collection
            </h2>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <span className="shadow-sm rounded-md">
              <Link href="/collection/import">
                <a>
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Import
                  </button>
                </a>
              </Link>
            </span>
            <span className="ml-3 shadow-sm rounded-md">
              <Link href="/collection/export">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Export
                </button>
              </Link>
            </span>
          </div>
        </div>
        <CollectionListing />
      </div>
    </React.Fragment>
  )
}

export default Page
