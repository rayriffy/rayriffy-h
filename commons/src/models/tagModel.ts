import { Type as t, type Static } from "@sinclair/typebox";

import { TagType } from "../constants/TagType";

export const tagModel = t.Object({
  id: t.String(),
  key: t.String(),
  slug: t.String(),
  name: t.String(),
  type: t.Enum(TagType),
});

export type Tag = Static<typeof tagModel>;
