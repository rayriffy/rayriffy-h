import React from 'react'

import { Search } from '@rayriffy-h/icons'

import { useSearchAvailable } from '../../services/useSearchAvailable'

export const DesktopSearch: React.FC = React.memo(props => {
  const { isAvailable } = useSearchAvailable()

  return (
    <div className="px-3 mt-5">
      <label htmlFor="search-desktop" className="sr-only">
        Search
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="mr-3 h-4 w-4 text-gray-400" />
        </div>
        <input
          id="search-desktop"
          className={`form-input block w-full pl-9 sm:text-sm sm:leading-5 transition ease-in-out duration-200 ${
            isAvailable ? '' : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
          disabled={!isAvailable}
          placeholder="Search"
        />
      </div>
    </div>
  )
})
