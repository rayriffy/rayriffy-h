import React, { useState, useCallback, useEffect } from 'react'

import { Search } from '@rayriffy-h/icons'

import debounce from 'lodash/debounce'

import { useSearchAvailable } from '../../services/useSearchAvailable'
import { useSearch } from '../../services/useSearch'

export const DesktopSearch: React.FC = React.memo(props => {
  const { isAvailable, availableType } = useSearchAvailable()

  console.log('availableType', availableType)

  const { query, dispatch } = useSearch(availableType)
  const [input, setInput] = useState(query ?? '')

  const setDebounceInput = useCallback<(val: string) => void>(
    debounce(value => {
      if (availableType !== undefined) {
        dispatch('search/query', {
          target: availableType as any,
          value,
        })
      }
    }, 500),
    []
  )

  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => {
      setInput(value)
      setDebounceInput(value)
    },
    []
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
      </div>
    </div>
  )
})
