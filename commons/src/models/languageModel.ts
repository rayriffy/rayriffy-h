import { Type as t, type Static } from "@sinclair/typebox";

export const languageModel = t.Union([
  t.Literal("en"), // English
  t.Literal("jp"), // Japanese
  t.Literal("cn"), // Chinese
  t.Literal("kr"), // Korean
  t.Literal("th"), // Thai
]);

export type Language = Static<typeof languageModel>;
