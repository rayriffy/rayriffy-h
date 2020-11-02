import React from 'react'

import { NextPage } from 'next'
import Link from 'next/link'

const Page: NextPage = props => {
  return (
    <div className="p-2 sm:p-4">
      <div className="md:flex md:items-center md:justify-between pt-6">
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
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out"
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
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-700 active:bg-blue-700 transition duration-150 ease-in-out"
              >
                Export
              </button>
            </Link>
          </span>
        </div>
      </div>
      <div className="flex justify-center pt-4">
        <nav className="z-0">
          {/* <Pagination max={maxPage} current={currentPage} prefix="/listing/" /> */}
        </nav>
      </div>
      <div className="py-4">{/* <Listing {...{ galleries }} /> */}</div>
      <div className="flex justify-center pb-4">
        <nav className="z-0">
          {/* <Pagination max={maxPage} current={currentPage} prefix="/listing/" /> */}
        </nav>
      </div>
    </div>
  )
}

export default Page
