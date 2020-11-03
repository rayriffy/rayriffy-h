import { useMemo } from 'react'

import { APIResponse, RawHentai, rawHentaiToHentai } from '@rayriffy-h/helper'

import useSWR from 'swr'
import { stringify } from 'querystring'

import { useSearch } from '../../../app/services/useSearch'

interface ExportedFunction {
  raw: RawHentai[]
  maxPage: number
}

export const useMainNavigation = (page: number) => {
  const { query } = useSearch('main')

  const transformedQuery = useMemo(
    () =>
      stringify({
        query:
          query === ''
            ? '-thisisrandomstringtomakesurethatthereisnoanytagbeingexcluded'
            : query,
        page,
      }),
    [page, query]
  )

  const { data, error } = useSWR<APIResponse<ExportedFunction>>(
    `https://h.api.rayriffy.com/v1/search?${transformedQuery}`,
    url => fetch(url).then(r => r.json())
  )

  return {
    data:
      data &&
      data.status === 'success' &&
      data.response.data.maxPage !== undefined
        ? {
            maxPage: data.response.data.maxPage,
            galleries: data.response.data.raw.map(o => rawHentaiToHentai(o)),
          }
        : undefined,
    isLoading: !error && !data,
    isError:
      error ||
      (data &&
        data.status !== 'success' &&
        data.response.data.maxPage === undefined),
  }
}
