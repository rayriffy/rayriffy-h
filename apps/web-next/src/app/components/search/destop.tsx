import { memo, useState, useCallback, useEffect, ChangeEventHandler } from 'react'

import { SearchIcon } from '@heroicons/react/outline'

import debounce from 'lodash.debounce'

import { useSearchAvailable } from '../../services/useSearchAvailable'
import { useSearch } from '../../services/useSearch'

export const DesktopSearch = memo(() => {
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

  const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
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
    <div className="px-3 mt-5">
      <label htmlFor="search-desktop" className="sr-only">
        Search
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div
          className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
          aria-hidden="true"
        >
          <SearchIcon className="mr-3 h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          name="search-desktop"
          id="search-desktop"
          className={`focus:ring-blue-500 focus:border-blue-500 block w-full pl-9 sm:text-sm border-gray-300 rounded-md ${!isAvailable ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : ''}`}
          placeholder="Search"
          disabled={!isAvailable}
          value={input}
          onChange={onChange}
        />
      </div>
      {/* <div className="mt-1 relative rounded-md shadow-sm">
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
          value={input}
          onChange={onChange}
        />
      </div> */}
    </div>
  )
})
