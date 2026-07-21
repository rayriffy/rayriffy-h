import { Type as t, type Static } from "typebox";

export const storeModel = t.Object({
  key: t.String(),
  ids: t.Array(t.String()),
});

export type Store = Static<typeof storeModel>;
