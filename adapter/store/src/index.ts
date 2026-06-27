import type { DataSource } from "@riffyh/commons";

import { getListing } from "./getListing";
import { getGallery } from "./getGallery";
import { getTagListing } from "./getTagListing";

export const store = (): DataSource => {
  return {
    key: "store",
    name: "Store",
    iconUrl: "", // Optional: provide a local store icon
    getListing,
    getGallery,
    getImage: () => {
      throw new Error("not implemented");
    },
    getTagListing,
  };
};
