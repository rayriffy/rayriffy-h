import { destr } from 'destr'
import kebabCase from 'lodash.kebabcase'

import { hentaiToMinifiedHentaiForListing } from '$core/services/hentaiToMinifiedHentaiForListing'

import type { NHHentai } from '$core/@types/NHHentai'
import type { Hentai } from '$core/@types/Hentai'
import type { TagType } from '$core/@types/TagType'
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
      .concat(
        excludeTags.map(tag => {
          const prefixes: TagType[] = [
            'parody',
            'tag',
            'language',
            'character',
            'group',
            'artist',
            'category',
          ]

          return prefixes.map(prefix => `-${prefix}:"${tag}"`).join(' ')
        })
      )
      .join(' ')

  if (query === '') query = defaultQuery

  interface APIResult {
    result: NHHentai[]
    num_pages: number
    per_page: number
  }

  const { result, num_pages } = await fetch(
    `https://nhentai.net/api/galleries/search?${new URLSearchParams({
      query: query ?? defaultQuery,
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
    title: item.title,
    images: {
      cover: item.images.cover,
      pages: item.images.pages,
    },
    media_id: item.media_id,
    num_pages: item.num_pages,
    tags: item.tags.map(tag => ({
      id: kebabCase(tag.name),
      name: tag.name,
      type: tag.type,
    })),
  }))

  return {
    maxPage: num_pages,
    items: searchResult.map(item => hentaiToMinifiedHentaiForListing(item)),
  }
}
