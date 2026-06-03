import { Type as t, type Static } from "@sinclair/typebox";
import { dataSourceModel } from "./dataSourceModel";

export const configModel = t.Object({
  hostname: t.Optional(t.String()),
  port: t.Optional(t.Number()),
  secretboxKey: t.String(),
  dataSources: t.Array(dataSourceModel),
});

export type Config = Static<typeof configModel>;
