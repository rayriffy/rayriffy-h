import { Type as t, type Static } from "@sinclair/typebox";
import { listingResultModel } from "./listingResultModel";
import { galleryModel } from "./galleryModel";

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
    t.Promise(listingResultModel),
  ),
  getGallery: t.Function(
    [
      t.Object({
        id: t.String(),
      }),
    ],
    t.Promise(galleryModel),
  ),
  getImage: t.Function(
    [
      t.Object({
        url: t.String(),
      }),
    ],
    t.Promise(t.Unsafe<Buffer>()),
  ),
});

export type DataSource = Static<typeof dataSourceModel>;
