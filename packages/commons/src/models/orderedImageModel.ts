import { Type as t, type Static } from "@sinclair/typebox";
import { imageModel } from "./imageModel";

export const orderedImageModel = t.Composite([
  imageModel,
  t.Object({
    order: t.Integer(),
  }),
]);

export type OrderedImage = Static<typeof orderedImageModel>;
