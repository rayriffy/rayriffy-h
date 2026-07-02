import { Type as t, type Static } from "@sinclair/typebox";

import { imageModel } from "./imageModel";
import { orderedImageModel } from "./orderedImageModel";
import { tagModel } from "./tagModel";
import { languageModel } from "./languageModel";

export const galleryModel = t.Object({
  id: t.String(),
  key: t.String(),
  title: t.Object({
    display: t.String(),
    original: t.Union([t.String(), t.Null()]),
  }),
  language: t.Union([languageModel, t.Null()]),
  cover: imageModel,
  pages: t.Array(orderedImageModel),
  tags: t.Array(tagModel),
});

export type Gallery = Static<typeof galleryModel>;
