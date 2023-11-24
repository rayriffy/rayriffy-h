import { api } from '$trpc/client'

export const getListing = async (
  page: number,
  query: string,
  mode: 'main' | 'listing' | 'tag',
  filteredTags: string[]
) =>
  api().hentai.search.query({
    mode,
    query,
    page,
    excludeTags: filteredTags,
  })
