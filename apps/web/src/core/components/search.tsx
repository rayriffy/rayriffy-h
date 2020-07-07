import React, { useState, useEffect } from 'react'

import { chunk, get } from 'lodash-es'

import { getSearch } from '@rayriffy-h/helper'

import * as searchHentaiWorker from '../services/worker/searchHentai.worker'

import { useStoreon } from '../../store'

import { Listing } from './listing'
import { Pagination } from './pagination'

import { ListingHentai } from '../@types/ListingHentai'
import { SearchProps } from '../@types/SearchProps'

export const Search: React.FC<SearchProps> = props => {
  const { raw, skip, showOnEmptyQuery = false, modeLock, target } = props

  const { dispatch, search } = useStoreon('search')

  const { input, query, first, res, page, maxPage, renderedRaw, mode } = search[
    target
  ]

  // Status state
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // Set mode
  const setMode = (mode: 'list' | 'nh') =>
    dispatch('search/update', {
      target,
      value: {
        mode,
        first: true,
        res: [],
      },
    })

  const { searchHentai } =
    typeof window === 'object'
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ((searchHentaiWorker as any)() as typeof searchHentaiWorker)
      : { searchHentai: null }

  const renderPage = async (raws: ListingHentai[], page: number) => {
    if (mode === 'list') {
      dispatch('search/update', {
        target,
        value: {
          page,
          maxPage: chunk(raws, skip).length,
          renderedRaw: get(chunk(raws, skip), page - 1, []),
        },
      })
    } else if (mode === 'nh') {
      setLoading(true)
      try {
        const res = await getSearch(query, page)
        dispatch('search/update', {
          target,
          value: {
            page,
            renderedRaw: res.raw.map(o => ({
              raw: o,
              internal: false,
            })),
          },
        })
      } catch {
        setError('Unable to retrieve data from server')
      } finally {
        setLoading(false)
      }
    }
  }

  const searchHandler = async () => {
    if (input === '') {
      const res = showOnEmptyQuery && mode === 'list' ? raw : []
      dispatch('search/update', {
        target,
        value: {
          query: '',
          res,
        },
      })

      if (showOnEmptyQuery && mode === 'list') {
        renderPage(res, 1)
      }
    } else {
      setLoading(true)
      setError(null)

      dispatch('search/update', {
        target,
        value: {
          first: false,
          query: input,
          res: [],
        },
      })

      if (mode === 'list') {
        const res = await searchHentai(input, raw)
        dispatch('search/update', {
          target,
          value: {
            res,
          },
        })

        renderPage(res, 1)
      } else if (mode === 'nh') {
        try {
          const res = await getSearch(input, 1)
          const transformedRes = res.raw.map(o => ({
            raw: o,
            internal: false,
          }))
          dispatch('search/update', {
            target,
            value: {
              page: 1,
              maxPage: res.maxPage,
              res: transformedRes,
              renderedRaw: transformedRes,
            },
          })
        } catch {
          setLoading(true)
          setError('Server returned an invalid response')
        }
      }

      setLoading(false)
    }
  }

  useEffect(() => {
    if (showOnEmptyQuery && renderedRaw.length === 0) {
      searchHandler()
    }
  }, [])

  return (
    <React.Fragment>
      <div className="flex justify-center pt-3">
        <div className="w-10/12 md:w-9/12 lg:w-7/12 xl:w-5/12">
          <div className="flex justify-center items-center">
            <input
              className="bg-white dark:bg-gray-900 focus:outline-none focus:shadow-outline border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full appearance-none leading-normal text-gray-900 dark:text-white"
              type="text"
              placeholder="Search"
              value={input}
              onKeyDown={e => (e.keyCode === 13 ? searchHandler() : null)}
              enterkeyhint="🔎"
              onChange={({ target: { value } }) => {
                dispatch('search/update', {
                  target,
                  value: {
                    input: value,
                  },
                })
              }}
            />
            <div className="px-2" />
            <button
              className="bg-blue-500 hover:bg-blue-700 w-12 h-10 rounded text-white"
              onClick={searchHandler}
            >
              <i className="fas fa-search"></i>
            </button>
          </div>
          {modeLock === undefined ? (
            <div className="pt-4">
              <div className="border border-gray-600 dark:border-gray-600 rounded flex overflow-hidden select-none">
                <div
                  className={`border-r border-gray-600 dark:border-gray-600 w-1/2 py-2 px-4 cursor-pointer flex justify-center items-center ${
                    mode === 'list'
                      ? 'text-gray-200 dark:text-gray-900 bg-gray-600 dark:bg-gray-300'
                      : 'text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-900'
                  }`}
                  onClick={() => setMode('list')}
                >
                  Listing
                </div>
                <div
                  className={`w-1/2 py-2 px-4 cursor-pointer flex justify-center items-center ${
                    mode === 'nh'
                      ? 'text-gray-200 dark:text-gray-900 bg-gray-600 dark:bg-gray-300'
                      : 'text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-900'
                  }`}
                  onClick={() => setMode('nh')}
                >
                  nhentai
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div className="pt-4">
        {loading ? (
          <div className="pt-12 text-gray-900 dark:text-white">
            <div className="spinner pb-6"></div>
            <div className="text-center pt-4">Loading...</div>
          </div>
        ) : res.length === 0 ? (
          <div className="pt-12 text-center">
            <div className="text-xl font-semibold text-gray-900 dark:text-white">
              {error !== null
                ? 'Failed'
                : (first || query === '') && !showOnEmptyQuery
                ? 'Search'
                : res.length === 0
                ? 'No result'
                : ''}
            </div>
            <div className="text-gray-600 dark:text-gray-500">
              {error !== null
                ? error
                : (first || query === '') && !showOnEmptyQuery
                ? 'Type your query in the box and search!'
                : res.length === 0
                ? 'No any result related to the query'
                : ''}
            </div>
          </div>
        ) : null}
        {res.length > 0 && !loading ? (
          <React.Fragment>
            <Pagination
              current={page}
              max={maxPage}
              link={false}
              onChange={page => renderPage(res, page)}
            />
            <Listing raw={renderedRaw} />
            <Pagination
              current={page}
              max={maxPage}
              link={false}
              onChange={page => renderPage(res, page)}
            />
          </React.Fragment>
        ) : null}
      </div>
    </React.Fragment>
  )
}
