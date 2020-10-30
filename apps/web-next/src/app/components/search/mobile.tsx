import React from 'react'

import { Search } from '@rayriffy-h/icons'

import { useSearchAvailable } from '../../services/useSearchAvailable'

export const MobileSearch: React.FC = React.memo(props => {
  const { isAvailable } = useSearchAvailable()

  return (
    <div
      className={`flex-1 flex justify-between px-4 sm:px-6 lg:px-8 transition ease-in-out duration-200 ${
        isAvailable ? '' : 'bg-gray-200 cursor-not-allowed'
      }`}
    >
      <div className="flex-1 flex">
        <div className="w-full flex md:ml-0">
          <label htmlFor="search-mobile" className="sr-only">
            Search
          </label>
          <div className="relative w-full text-gray-400 focus-within:text-gray-600">
            <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
              <Search className="h-5 w-5" />
            </div>
            <input
              id="search-mobile"
              className={`block w-full h-full pl-8 pr-3 py-2 rounded-md placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 sm:text-sm ${
                isAvailable ? 'text-gray-900' : 'text-gray-500'
              }`}
              placeholder="Search"
              disabled={!isAvailable}
              type="search"
            />
          </div>
        </div>
      </div>
    </div>
  )
})
