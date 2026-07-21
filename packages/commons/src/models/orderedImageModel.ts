import { Type as t, type Static } from "typebox";
import { imageModel } from "./imageModel";

export const orderedImageModel = t.Evaluate(
  t.Intersect([
    imageModel,
    t.Object({
      order: t.Integer(),
    }),
  ]),
);

export type OrderedImage = Static<typeof orderedImageModel>;
