import { codes } from '../../../core/constants/codes'
import { getHentai } from '../../../core/services/getHentai'

import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async event => {
  // get target code
  const { code } = event.params

  // get hentai
  const hentai = await getHentai(code)
  const excludeDatabase = codes.find(
    o => typeof o !== 'number' && o.code === Number(code)
  )

  return {
    hentai,
    excludes:
      excludeDatabase === undefined
        ? []
        : (excludeDatabase as { code: number; exclude: number[] }).exclude,
  }
}
