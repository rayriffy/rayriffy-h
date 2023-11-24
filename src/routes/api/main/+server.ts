import { json } from '@sveltejs/kit'

import { destr } from 'destr'

import { hentaiToMinifiedHentaiForListing } from '$core/services/hentaiToMinifiedHentaiForListing'

import type { RequestHandler } from './$types'
import type { NHHentai } from '$core/@types/NHHentai'
import type { Hentai } from '$core/@types/Hentai'
import kebabCase from 'lodash.kebabcase'
import type { TagType } from '$core/@types/TagType'

const defaultQuery =
  '-thisisrandomstringtomakesurethatthereisnoanytagbeingexcluded'

export const GET: RequestHandler = async event => {
  let query = event.url.searchParams.get('query') ?? ''
  const page = event.url.searchParams.get('page')
  const filteredTags: string[] =
    JSON.parse(event.url.searchParams.get('filteredTags') as string) ?? []

  if (filteredTags.length > 0)
    query = query
      .split(' ')
      .filter(o => o !== '')
      .concat(
        filteredTags.map(tag => {
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

  try {
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

    // convert
    const parsedGalleries = searchResult.map(item =>
      hentaiToMinifiedHentaiForListing(item)
    )

    return json(
      {
        status: 'success',
        response: {
          data: {
            maxPage: num_pages,
            items: parsedGalleries,
          },
        },
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 's-maxage=300',
        },
      }
    )
  } catch (e) {
    console.log(e)
    return json(
      {
        status: 'failed',
        response: (e as Error)?.message ?? null,
      },
      {
        status: 500,
        headers: {
          'Cache-Control': 's-maxage=300',
        },
      }
    )
  }
}
