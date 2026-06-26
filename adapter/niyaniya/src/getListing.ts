import { key } from "./key";

import type { DataSource, ListingResult } from "@riffyh/commons";
import type { Options } from "./types/Options";
import { getBookSearch } from "./functions/getBookSearch";
import { getBookDetail } from "./functions/getBookDetail";
import { getLanugageByTags } from "./language";

export const getListing = async (
  { searchQuery, page }: Parameters<DataSource["getListing"]>[0],
  options: Options,
): ReturnType<DataSource["getListing"]> => {
  const bookSearch = await getBookSearch(searchQuery, page, options.userAgent);

  const galleries = await Promise.all(
    bookSearch.entries.map(async (entry) => {
      const bookDetail = await getBookDetail(entry.id.toString(), entry.key, options.userAgent);

      return {
        id: entry.id.toString() + "." + entry.key,
        key,
        title: {
          display: entry.title,
          original: null,
        },
        language: getLanugageByTags(bookDetail.tags),
        cover: {
          src: entry.thumbnail.path,
          width: entry.thumbnail.dimensions[0],
          height: entry.thumbnail.dimensions[1],
        },
      } satisfies ListingResult["galleries"][number];
    }),
  );

  const result: ListingResult = {
    galleries,
    currentPage: page,
    maximumPages: Math.ceil(bookSearch.total / bookSearch.limit),
  };

  return result;
};
