import { Type as t, type Static } from "@sinclair/typebox";
import { dataSourceModel } from "./dataSourceModel";

export const configModel = t.Object({
  baseUrl: t.String(),
  dataSources: t.Array(dataSourceModel),
});

export type Config = Static<typeof configModel>;
