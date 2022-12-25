import fs from 'fs'

import { getHentai } from '../../../core/services/getHentai'

import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async event => {
  // get target code
  const { code } = event.params

  console.log({ code })

  // get hentai
  const hentai = await getHentai(code)

  return {
    hentai,
  }
}
