import type { DataSource } from "@riffyh/commons";
import { getGallery } from "./getGallery";
import { getListing } from "./getListing";
import { getImage } from "./getImage";
import { key } from "./key";

import type { Options } from "./types/Options";
import { getTagListing } from "./getTagListing";

export const nhentai = (options?: Options): DataSource => {
  return {
    key,
    name: "nhentai",
    iconUrl: "https://nhentai.net/favicon.png",
    getGallery: getGallery(options),
    getListing: getListing(options),
    getTagListing: getTagListing(options),
    getImage,
  };
};
