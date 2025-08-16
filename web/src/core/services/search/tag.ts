import fs from 'fs'
import path from 'path'

import { destr } from 'destr'

import { itemsPerPage } from '@riffyh/commons'
import { hentaiToMinifiedHentaiForListing } from '$core/services/hentaiToMinifiedHentaiForListing'

import type { Hentai } from '@riffyh/commons'
import type { SearchInput } from '$core/constants/schema/searchInput'

export const searchTag = async ({ query, page }: Omit<SearchInput, 'mode'>) => {
  const searchKeyHentais = destr<Hentai[]>(
    await fs.promises.readFile(
      path.join(process.cwd(), 'data/searchKey.json'),
      'utf8'
    )
  )

  const filteredHentais = searchKeyHentais.filter(
    hentai =>
      hentai.tags.find(o => o.id.toString() === query.toString()) !== undefined
  )

  return {
    maxPage: Math.ceil(filteredHentais.length / itemsPerPage),
    items: filteredHentais
      .slice((Number(page) - 1) * itemsPerPage, itemsPerPage * Number(page))
      .map(o => hentaiToMinifiedHentaiForListing(o)),
  }
}
