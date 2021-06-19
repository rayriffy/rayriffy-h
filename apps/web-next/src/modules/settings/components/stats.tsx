import React, { useCallback } from 'react'

import Link from 'next/link'

import { BookmarkIcon, ClockIcon, CursorClickIcon } from '@heroicons/react/outline'
import { useStoreon } from '@rayriffy-h/state-engine'

export const Stats: React.FC = props => {
  const { collection, history, metadata, dispatch } = useStoreon(
    'collection',
    'history',
    'metadata'
  )

  const resetCounter = useCallback(
    () => dispatch('metadata/viewCount/reset'),
    []
  )

  return (
    <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <div className="bg-white overflow-hidden shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
              <BookmarkIcon className="h-6 w-6 text-white" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm leading-5 font-medium text-gray-500 truncate">
                  Total Collections
                </dt>
                <dd className="text-2xl leading-8 font-semibold text-gray-900">
                  {collection.data.length.toLocaleString()}
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-4 sm:px-6">
          <div className="text-sm leading-5">
            <Link href="/collection">
              <a className="font-medium text-blue-600 hover:text-blue-500 transition ease-in-out duration-150">
                View all
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-white overflow-hidden shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
              <ClockIcon className="h-6 w-6 text-white" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm leading-5 font-medium text-gray-500 truncate">
                  Gallery history
                </dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl leading-8 font-semibold text-gray-900">
                    {history.items.length}
                  </div>
                  <div className="ml-2 flex items-baseline text-sm leading-5 font-semibold text-gray-600">
                    / 15
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-4 sm:px-6">
          <div className="text-sm leading-5">
            <Link href="/history">
              <a className="font-medium text-blue-600 hover:text-blue-500 transition ease-in-out duration-150">
                View all
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-white overflow-hidden shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
              <CursorClickIcon className="h-6 w-6 text-white" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm leading-5 font-medium text-gray-500 truncate">
                  Total views
                </dt>
                <dd className="text-2xl leading-8 font-semibold text-gray-900">
                  {metadata.viewCount.toLocaleString()}
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-4 sm:px-6">
          <div className="text-sm leading-5">
            <button
              className="font-medium text-red-600 hover:text-red-500 transition ease-in-out duration-150"
              onClick={resetCounter}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
