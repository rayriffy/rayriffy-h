import type { ListingResult } from "@riffyh/commons";
import type { NhentaiSearchResult } from "../types/NhentaiSearchResult";
import { key } from "../key";
import { getLanguageByTagId } from "../language";

export const searchResultMapper = (
  searchResult: NhentaiSearchResult,
  page: number,
): ListingResult => ({
  galleries: searchResult.result.map((result) => ({
    id: result.id.toString(),
    key,
    title: {
      display: result.english_title ?? result.japanese_title,
      original: null,
    },
    language: getLanguageByTagId(result.tag_ids),
    cover: {
      src: `https://t4.nhentai.net/${result.thumbnail}`,
      width: result.thumbnail_width,
      height: result.thumbnail_height,
    },
  })),
  currentPage: page,
  maximumPages: searchResult.num_pages,
});
