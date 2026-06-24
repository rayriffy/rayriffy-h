import type { DataSource } from "@riffyh/commons";

import { getListing } from "./getListing";

export const store = (): DataSource => {
  return {
    key: "store",
    name: "Store",
    iconUrl: "", // Optional: provide a local store icon
    getListing,
    getGallery: () => {
      throw new Error("not implemented");
    },
    getImage: () => {
      throw new Error("not implemented");
    },
  };
};
