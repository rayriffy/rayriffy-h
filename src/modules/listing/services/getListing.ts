import type { APIResponse } from '$core/@types/APIResponse'
import type { ListingResult } from '$core/@types/ListingResult'
import type { Search } from '$nanostores/@types/Search'

export const getListing = async (
  page: number,
  query: string,
  mode: keyof Search | 'tag'
) => {
  const fetchedData: APIResponse<ListingResult> = await fetch(
    `/api/${mode}?${new URLSearchParams({
      query: query,
      page: page.toString(),
    }).toString()}`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  ).then(o => o.json())

  if (fetchedData.status !== 'success') {
    throw Error('failed to fetch data')
  }

  return fetchedData.response.data
}
