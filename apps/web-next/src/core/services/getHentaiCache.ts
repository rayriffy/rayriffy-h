import { getHentai, Hentai } from '@rayriffy-h/helper'

export const getHentaiCache = async (id: string | number) => {
  // try {
  //   const res: Hentai[] = await fetch(
  //     'https://h.rayriffy.com/static/searchKey.json'
  //   ).then(o => o.json())

  //   const targetHentai = res.find(o => o.id.toString() === id.toString())

  //   if (targetHentai) {
  //     return targetHentai
  //   } else {
  //     throw new Error('cache-miss')
  //   }
  // } catch {
  //   return await getHentai(id)
  // }
  return await getHentai(id)
}
