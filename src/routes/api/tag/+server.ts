import fs from 'fs'
import path from 'path'

import { json } from '@sveltejs/kit'
import { itemsPerPage } from '$core/constants/itemsPerPage'
import { hentaiToMinifiedHentaiForListing } from '$core/services/hentaiToMinifiedHentaiForListing'

import type { RequestHandler } from './$types'
import type { Hentai } from '$core/@types/Hentai'

export const GET: RequestHandler = async event => {
  const query = event.url.searchParams.get('query')
  const page = event.url.searchParams.get('page')

  const searchKeyHentais: Hentai[] = JSON.parse(
    await fs.promises.readFile(
      path.join(process.cwd(), 'data/searchKey.json'),
      'utf8'
    )
  )
  const filteredHentais = searchKeyHentais.filter(
    hentai => hentai.tags.find(o => o.id === query) !== undefined
  )

  return json(
    {
      status: 'success',
      response: {
        data: {
          maxPage: Math.ceil(filteredHentais.length / itemsPerPage),
          items: filteredHentais
            .slice(
              (Number(page) - 1) * itemsPerPage,
              itemsPerPage * Number(page)
            )
            .map(o => hentaiToMinifiedHentaiForListing(o)),
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
}
