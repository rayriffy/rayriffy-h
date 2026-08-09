import type { DataSource } from "@riffyh/commons";

import { EhentaiClient } from "./client";
import type { ExHentaiOptions, Options } from "./types";

const createDataSource = (host: "e-hentai.org" | "exhentai.org", options?: Options): DataSource => {
  const client = new EhentaiClient(host, options);
  const name = host === "e-hentai.org" ? "E-Hentai" : "ExHentai";

  return {
    key: client.key,
    name,
    iconUrl: "https://e-hentai.org/favicon.ico",
    getGallery: (payload) => client.getGallery(payload),
    getGalleryPages: (payload) => client.getGalleryPages(payload),
    getImage: (payload) => client.getImage(payload),
    getListing: (payload) => client.getListing(payload),
    getTagListing: (payload) => client.getTagListing(payload),
  };
};

export const ehentai = (options?: Options) => createDataSource("e-hentai.org", options);

export const exhentai = (options: ExHentaiOptions) => createDataSource("exhentai.org", options);

export type { ExHentaiOptions, Options } from "./types";
