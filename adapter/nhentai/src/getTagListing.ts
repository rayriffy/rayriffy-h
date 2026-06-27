import type { DataSource } from "@riffyh/commons";
import type { Options } from "./types/Options";
import type { NhentaiSearchResult } from "./types/NhentaiSearchResult";
import { searchResultMapper } from "./functions/searchResultMapper";
import pThrottle from "p-throttle";

export const getTagListing = (options?: Options): DataSource["getTagListing"] =>
  pThrottle({
    limit: options?.apiKey ? 15 : 30,
    interval: 60 * 1000,
  })(async ({ id, page }) => {
    const payload = new URLSearchParams({
      tag_id: id,
      sort: "date",
      page: page.toString(),
    });

    const data = await fetch(`https://nhentai.net/api/v2/galleries/tagged?${payload.toString()}`, {
      headers: options?.apiKey
        ? {
            Authorization: `Key ${options.apiKey}`,
          }
        : {},
    }).then((o) => {
      if (o.ok) return o.json() as Promise<NhentaiSearchResult>;
      else throw o;
    });

    return searchResultMapper(data, page);
  });
