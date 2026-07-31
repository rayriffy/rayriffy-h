import { Type as t, type Static } from "typebox";
import type { ListingResult } from "./listingResultModel";
import type { Gallery } from "./galleryModel";

export const dataSourceModel = t.Object({
  key: t.String(),
  name: t.String(),
  iconUrl: t.String(),
  getListing: t.Function(
    [
      t.Object({
        searchQuery: t.Union([t.Null(), t.String()]),
        page: t.Integer(),
      }),
    ],
    t.Unsafe<Promise<ListingResult>>({
      type: "promise_listingResult",
    }),
  ),
  getTagListing: t.Function(
    [
      t.Object({
        id: t.String(),
        page: t.Integer(),
      }),
    ],
    t.Unsafe<Promise<ListingResult>>({
      type: "promise_listingResult",
    }),
  ),
  getGallery: t.Function(
    [
      t.Object({
        id: t.String(),
      }),
    ],
    t.Unsafe<Promise<Gallery>>({
      type: "promise_gallery",
    }),
  ),
  getImage: t.Function(
    [
      t.Object({
        url: t.String(),
      }),
    ],
    t.Unsafe<Buffer>({
      type: "buffer",
    }),
  ),
});

export type DataSource = Static<typeof dataSourceModel>;
