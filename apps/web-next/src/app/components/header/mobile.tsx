import React from 'react'

import { MenuAlt1, Search } from '@rayriffy-h/icons'

interface IProps {
  onToggleSidebar?(): void
}

export const MobileHeader: React.FC<IProps> = React.memo(props => {
  const { onToggleSidebar = () => {} } = props

  return (
    <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:hidden">
      <button
        onClick={onToggleSidebar}
        className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:bg-gray-100 focus:text-gray-600 lg:hidden"
        aria-label="Open sidebar"
      >
        <MenuAlt1 className="h-6 w-6" />
      </button>
      <div className="flex-1 flex justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex-1 flex">
          <form className="w-full flex md:ml-0" action="#" method="GET">
            <label htmlFor="search_field" className="sr-only">
              Search
            </label>
            <div className="relative w-full text-gray-400 focus-within:text-gray-600">
              <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                <Search className="h-5 w-5" />
              </div>
              <input
                id="search_field"
                className="block w-full h-full pl-8 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 sm:text-sm"
                placeholder="Search"
                type="search"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
})
