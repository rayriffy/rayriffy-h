import type { DataSource } from "@riffyh/commons";
import type { Options } from "./types/Options";
import { getListing } from "./getListing";

const extractTag = (id: string) => {
  const index = id.indexOf(":");
  if (index === -1) {
    return {
      type: "tag",
      name: id,
    };
  }
  return {
    type: id.slice(0, index),
    name: id.slice(index + 1),
  };
};

export const getTagListing = (
  { id, page }: Parameters<DataSource["getTagListing"]>[0],
  options: Options,
) => {
  const { type, name } = extractTag(id);
  return getListing(
    {
      searchQuery: `${type}:"^${name}$"`,
      page,
    },
    options,
  );
};
