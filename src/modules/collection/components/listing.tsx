import { memo, Fragment, useCallback, useMemo } from 'react'

import chunk from 'lodash/chunk'

import { Pagination } from '../../../core/components/pagination'
import { Listing } from '../../../core/components/listing'

import { searchHentai } from '../services/worker/searchHentai.worker'
import { useSearch } from '../../../layout/services/useSearch'
import { useStoreon } from '../../../context'
import { itemsPerPage } from '../../../core/constants/itemsPerPage'

export const CollectionListing = memo(() => {
  const { collection } = useStoreon('collection')

  const { query, page, dispatch } = useSearch('collection')

  const searchResult = useMemo(
    () =>
      query === ''
        ? collection.data.map(o => o.data)
        : searchHentai(
            query,
            collection.data.map(o => o.data)
          ),
    [collection, query]
  )

  const maxPage = useMemo(
    () => chunk(searchResult, itemsPerPage).length,
    [searchResult]
  )
  const galleries = useMemo(
    () => chunk(searchResult, itemsPerPage)[page - 1] ?? [],
    [page, searchResult]
  )

  const onNavigate = useCallback<(page: number) => void>(page => {
    dispatch('search/update', {
      target: 'collection',
      value: {
        page: page,
      },
    })
  }, [])

  return (
    <Fragment>
      <div className="flex justify-center pt-4">
        <nav className="z-0">
          <Pagination
            max={maxPage}
            current={page}
            link={false}
            onChange={onNavigate}
          />
        </nav>
      </div>
      <div className="py-4">
        <Listing {...{ galleries: galleries }} />
      </div>
      <div className="flex justify-center pb-4">
        <nav className="z-0">
          <Pagination
            max={maxPage}
            current={page}
            link={false}
            onChange={onNavigate}
          />
        </nav>
      </div>
    </Fragment>
  )
})
