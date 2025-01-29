import { Hentai, getHentaiFromNH } from '@riffyh/commons'

export const fetchHentai = async (
  code: string | number,
  secondAttempt = false
): Promise<Hentai | null> => {
  try {
    return getHentaiFromNH(code)
  } catch (e) {
    if (!secondAttempt) {
      await new Promise(res => setTimeout(res, 3000))
      return fetchHentai(code, true)
    }

    throw e
  }
}
