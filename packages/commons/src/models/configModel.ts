import { Type as t, type Static } from "@sinclair/typebox";
import { dataSourceModel } from "./dataSourceModel";
import { storeModel } from "./storeModel";

export const configModel = t.Object({
  hostname: t.Optional(t.String()),
  port: t.Optional(t.Number()),
  secretboxKey: t.String(),
  dataSources: t.Array(dataSourceModel),
  store: t.Optional(t.Array(storeModel)),
});

export type Config = Static<typeof configModel>;
