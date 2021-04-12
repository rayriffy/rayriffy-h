import React, { useState, useCallback, useEffect } from 'react'

import { Search } from '@rayriffy-h/icons'

import debounce from 'lodash/debounce'

import { useSearchAvailable } from '../../services/useSearchAvailable'
import { useSearch } from '../../services/useSearch'

export const MobileSearch: React.FC = React.memo(props => {
  const { isAvailable, availableType } = useSearchAvailable()

  const { query, dispatch } = useSearch(availableType)
  const [input, setInput] = useState(query ?? '')

  const setDebounceInput = debounce(value => {
    if (availableType !== undefined) {
      dispatch('search/query', {
        target: availableType as any,
        value,
      })
    }
  }, 500)

  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => {
      setInput(value)
      setDebounceInput(value)
    },
    [availableType]
  )

  useEffect(() => {
    if (availableType !== undefined) {
      setInput(query)
    }
  }, [query])

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
              name="search-mobile"
              className={`border-none block w-full h-full pl-8 pr-3 py-2 border-transparent placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 sm:text-sm ${isAvailable ? 'text-gray-900' : 'text-gray-500 bg-gray-200'}`}
              placeholder="Search"
              type="search"
              disabled={!isAvailable}
              value={input}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    </div>
  )
})
