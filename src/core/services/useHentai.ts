import useSWR from 'swr'

import { rawHentaiToHentai } from './rawHentaiToHentai'
import { APIResponse } from '../@types/APIResponse'
import { RawHentai } from '../@types/RawHentai'

export const useHentai = (id: number | string) => {
  const { data, error } = useSWR<APIResponse<RawHentai>>(
    `https://h.api.rayriffy.com/v1/gallery/${id}`,
    url => fetch(url).then(r => r.json())
  )

  return {
    hentai:
      data && data.status === 'success'
        ? rawHentaiToHentai(data.response.data)
        : undefined,
    isLoading: !error && !data,
    isError: error || (data && data.status !== 'success'),
  }
}
