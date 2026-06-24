import pThrottle from "p-throttle";
import { key } from "./key";

import type { DataSource, ListingResult } from "@riffyh/commons";
import type { NhentaiSearchResult } from "./types/NhentaiSearchResult";
import type { Options } from "./types/Options";

export const getListing = (options?: Options): DataSource["getListing"] =>
  pThrottle({
    limit: options?.apiKey ? 10 : 20,
    interval: 60 * 1000,
  })(async ({ searchQuery, page }) => {
    const payload = new URLSearchParams({
      query: searchQuery ?? "-thisisrandomstringtomakesurethatthereisnoanytagbeingexcluded",
      sort: "date",
      page: page.toString(),
    });

    const data = await fetch(`https://nhentai.net/api/v2/search?${payload.toString()}`, {
      headers: options?.apiKey
        ? {
            Authorization: `Key ${options.apiKey}`,
          }
        : {},
    }).then((o) => {
      if (o.ok) return o.json() as Promise<NhentaiSearchResult>;
      else throw o;
    });

    const result: ListingResult = {
      galleries: data.result.map((result) => ({
        id: result.id.toString(),
        key,
        title: {
          display: result.english_title ?? result.japanese_title,
          original: null,
        },
        cover: {
          src: `https://t4.nhentai.net/${result.thumbnail}`,
          width: result.thumbnail_width,
          height: result.thumbnail_height,
        },
      })),
      currentPage: page,
      maximumPages: data.num_pages,
    };

    return result;
  });
