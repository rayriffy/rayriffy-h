import type { DataSource } from "@riffyh/commons";

export const custom: DataSource = {
  key: "store",
  name: "Store",
  iconUrl: "",
  getGallery: () => {
    throw new Error("Not implemented");
  },
};
