import type { DataSource } from "@riffyh/commons";
import { getGallery } from "./getGalery";
import { getListing } from "./getListing";
import { getImage } from "./getImage";
import { key } from "./key";

export const nhentai = (): DataSource => {
  return {
    key,
    name: "nhentai",
    iconUrl: "https://nhentai.net/favicon.png",
    getGallery,
    getListing,
    getImage,
  };
};
