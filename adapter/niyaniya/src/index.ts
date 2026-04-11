import type { DataSource } from "@riffyh/commons";
import { getGallery } from "./getGalery";
import { getListing } from "./getListing";
import { getImage } from "./getImage";
import { key } from "./key";

import type { Options } from "./types/Options";

export const niyaniya = (options: Options): DataSource => {
  return {
    key,
    name: "niyaniya",
    iconUrl: "https://niyaniya.moe/favicon.ico",
    getGallery: (payload) => getGallery(payload, options),
    getListing: (payload) => getListing(payload, options),
    getImage: (payload) => getImage(payload, options),
  };
};
