import { headers } from "./constants/headers";
import { key } from "./key";

import type { DataSource, ListingResult } from "@riffyh/commons";
import type { NiyaSearchResult } from "./types/NiyaSearchResult";
import type { Options } from "./types/Options";

export const getListing = async (
  { searchQuery, page }: Parameters<DataSource["getListing"]>[0],
  options: Options,
): ReturnType<DataSource["getListing"]> => {
  const payload = new URLSearchParams();

  if (searchQuery !== null && searchQuery !== "") payload.append("s", searchQuery);
  if (page !== 1) payload.append("page", page.toString());

  const data = await fetch(`https://api.schale.network/books?${payload.toString()}`, {
    headers: {
      ...headers,
      "User-Agent": options.userAgent,
    },
  }).then((o) => {
    if (o.ok) return o.json() as Promise<NiyaSearchResult>;
    else throw o;
  });

  const result: ListingResult = {
    galleries: data.entries.map((result) => ({
      id: result.id.toString() + "." + result.key,
      key,
      title: {
        display: result.title,
        original: null,
      },
      cover: {
        src: result.thumbnail.path,
        width: result.thumbnail.dimensions[0],
        height: result.thumbnail.dimensions[1],
      },
    })),
    currentPage: page,
    maximumPages: Math.ceil(data.total / data.limit),
  };

  return result;
};
