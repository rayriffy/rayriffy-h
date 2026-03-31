import { destr } from 'destr'
import kebabCase from 'lodash/kebabCase'

import { hentaiToMinifiedHentaiForListing } from '$core/services/hentaiToMinifiedHentaiForListing'

import type { NHHentai, Hentai } from '@riffyh/commons'
import type { SearchInput } from '$core/constants/schema/searchInput'

const defaultQuery =
  '-thisisrandomstringtomakesurethatthereisnoanytagbeingexcluded'

export const searchMain = async ({
  query,
  page,
  excludeTags,
}: Omit<SearchInput, 'mode'>) => {
  if (excludeTags.length > 0)
    query = query
      .split(' ')
      .filter(o => o !== '')
      .concat(excludeTags.map(tag => `-${tag}`))
      .join(' ')

  if (query === '') query = defaultQuery

  interface APIResult {
    result: {
      id: number
      media_id: string
      thumbnail: string
      thumbnail_width: number
      thumbnail_height: number
      english_title: string
      japanese_title: string
      num_pages: number
      tag_ids: number[]
    }[]
    num_pages: number
    total: number
    per_page: number
  }

  const { result, num_pages } = await fetch(
    `https://nhentai.net/api/v2/search?${new URLSearchParams({
      query: query ?? defaultQuery,
      sort: 'date',
      page: page?.toString() ?? '1',
    }).toString()}`
  ).then(async o => {
    if (o.status === 200) {
      return destr<APIResult>(await o.text())
    } else {
      console.log('status: ', o.status)
      throw new Error(destr(await o.text()))
    }
  })

  const searchResult: Hentai[] = result.map(item => ({
    id: item.id,
    title: {
      english: item.english_title,
      japanese: item.japanese_title,
      pretty: item.english_title,
    },
    images: {
      cover: {
        w: item.thumbnail_width,
        h: item.thumbnail_height,
        t: 'j'
      },
      pages: [],
    },
    media_id: item.media_id,
    num_pages: item.num_pages,
    tags: [],
  }))

  return {
    maxPage: num_pages,
    items: searchResult.map(item => hentaiToMinifiedHentaiForListing(item)),
  }
}
