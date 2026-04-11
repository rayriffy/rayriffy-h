import { Type as t, type Static } from "@sinclair/typebox";

import { imageModel } from "./imageModel";
import { orderedImageModel } from "./orderedImageModel";
import { tagModel } from "./tagModel";

export const galleryModel = t.Object({
  id: t.String(),
  key: t.String(),
  title: t.Object({
    display: t.String(),
    original: t.Union([t.String(), t.Null()]),
  }),
  cover: imageModel,
  pages: t.Array(orderedImageModel),
  tags: t.Array(tagModel),
});

export type Gallery = Static<typeof galleryModel>;
