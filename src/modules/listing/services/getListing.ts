import type { APIResponse } from '$core/@types/APIResponse'
import type { MinifiedHentaiForListing } from '$core/@types/MinifiedHentaiForListing'
import type { SearchStore } from '$storeon/@types/SearchStore'

export const getListing = async (
  page: number,
  query: string,
  mode: keyof SearchStore['search'] | 'tag'
) => {
  interface ExportedFunction {
    items: MinifiedHentaiForListing[]
    maxPage: number
  }

  const fetchedData: APIResponse<ExportedFunction> = await fetch(
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
