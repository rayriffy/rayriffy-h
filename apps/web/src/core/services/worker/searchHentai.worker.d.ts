import { ListingHentai } from '../../@types/ListingHentai'

export function searchHentai(
  query: string,
  raws: ListingHentai[]
): Promise<ListingHentai[]>
