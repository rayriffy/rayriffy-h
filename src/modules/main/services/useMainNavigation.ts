import { useMemo } from 'react'

import useSWR from 'swr'

import { useSearch } from '../../../layout/services/useSearch'
import { APIResponse } from '../../../core/@types/APIResponse'
import { MinifiedHentaiForListing } from '../../../core/@types/MinifiedHentaiForListing'

interface ExportedFunction {
  items: MinifiedHentaiForListing[]
  maxPage: number
}

export const useMainNavigation = (page: number) => {
  const { query } = useSearch('main')

  const transformedQuery = useMemo(
    () =>
      new URLSearchParams({
        query: query === '' ? 'doujinshi' : query,
        page: page.toString(),
      }),
    [page, query]
  )

  const { data, error } = useSWR<APIResponse<ExportedFunction>>(
    `/api/nh-search?${transformedQuery}`,
    url => fetch(url).then(r => r.json())
  )

  return {
    data:
      data &&
      data.status === 'success' &&
      data.response.data.maxPage !== undefined
        ? {
            maxPage: data.response.data.maxPage,
            galleries: data.response.data.items,
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
