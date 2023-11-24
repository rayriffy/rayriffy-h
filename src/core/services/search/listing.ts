import fs from 'fs'
import path from 'path'

import { destr } from 'destr'

import { searchHentai } from '$core/services/searchHentai'
import { hentaiToMinifiedHentaiForListing } from '$core/services/hentaiToMinifiedHentaiForListing'

import type { SearchInput } from '$core/constants/schema/searchInput'
import type { Hentai } from '$core/@types/Hentai'

export const searchListing = async ({
  query,
  page,
  excludeTags,
}: Omit<SearchInput, 'mode'>) => {
  // if no search query then local search return null, otherwise return search results
  const localSearch =
    query === '' && excludeTags.length === 0
      ? null
      : searchHentai(
          query ?? '',
          Number(page),
          destr<Hentai[]>(
            await fs.promises.readFile(
              path.join(process.cwd(), 'data/searchKey.json'),
              'utf8'
            )
          ),
          excludeTags
        )

  const totalListingPages =
    localSearch?.totalPages ??
    (await fs.promises.readdir(path.join(process.cwd(), 'data/prebuiltChunks')))
      .length
  const hentais =
    (localSearch?.hentais as Hentai[]) ??
    (await fs.promises
      .readFile(
        path.join(process.cwd(), 'data/prebuiltChunks', `chunk-${page}.json`),
        'utf8'
      )
      .then(value => destr<number[]>(value))
      .then(codes =>
        Promise.all(
          codes.map(async code =>
            destr<Hentai>(
              await fs.promises.readFile(
                path.join(process.cwd(), 'data/hentai', `${code}.json`),
                'utf8'
              )
            )
          )
        )
      ))

  return {
    maxPage: totalListingPages,
    items: hentais.map(o => hentaiToMinifiedHentaiForListing(o)),
  }
}
