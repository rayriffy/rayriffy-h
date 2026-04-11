import { Type as t, type Static } from "@sinclair/typebox";

import { galleryModel } from "./galleryModel";

export const listingResultModel = t.Object({
  galleries: t.Array(t.Omit(galleryModel, ["pages", "tags"])),
  currentPage: t.Integer(),
  maximumPages: t.Integer(),
});

export type ListingResult = Static<typeof listingResultModel>;
