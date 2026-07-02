import { Type as t, type Static } from "@sinclair/typebox";

export const imageModel = t.Object({
  src: t.String(),
  width: t.Integer(),
  height: t.Integer(),
});

export type Image = Static<typeof imageModel>;
