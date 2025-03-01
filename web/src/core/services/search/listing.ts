import fs from 'fs'
import path from 'path'

import { readDataFile } from '@riffyh/commons'

import { searchHentai } from '$core/services/searchHentai'
import { hentaiToMinifiedHentaiForListing } from '$core/services/hentaiToMinifiedHentaiForListing'

import type { SearchInput } from '$core/constants/schema/searchInput'
import type { Hentai } from '@riffyh/commons'

export const searchListing = async ({
  query,
  page,
  excludeTags,
}: Omit<SearchInput, 'mode'>) => {
  const cwd = process.cwd()
  
  // if no search query then local search return null, otherwise return search results
  const localSearch =
    query === '' && excludeTags.length === 0
      ? null
      : searchHentai(
          query ?? '',
          Number(page),
          await readDataFile<Hentai[]>(cwd, 'searchKey.json'),
          excludeTags
        )

  const totalListingPages =
    localSearch?.totalPages ??
    (await fs.promises.readdir(path.join(cwd, 'data/prebuiltChunks'))).length
    
  const hentais =
    (localSearch?.hentais as Hentai[]) ??
    (await readDataFile<number[]>(cwd, path.join('prebuiltChunks', `chunk-${page}.json`))
      .then(codes =>
        Promise.all(
          codes.map(async code =>
            readDataFile<Hentai>(cwd, path.join('hentai', `${code}.json`))
          )
        )
      ))

  return {
    maxPage: totalListingPages,
    items: hentais.map(o => hentaiToMinifiedHentaiForListing(o)),
  }
}
