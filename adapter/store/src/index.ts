import type { DataSource } from "@riffyh/commons";

import { getListing } from "./getListing";
import { getGallery } from "./getGallery";
import { getTagListing } from "./getTagListing";
import type { Options } from "./Options";

export const store = (options: Options): DataSource => {
  return {
    key: "store",
    name: "Store",
    iconUrl: "", // Optional: provide a local store icon
    getListing: getListing(options),
    getGallery: getGallery(options),
    getTagListing: getTagListing(options),
    getImage: () => {
      throw new Error("not implemented");
    },
  };
};
