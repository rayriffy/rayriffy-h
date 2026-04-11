import pThrottle from "p-throttle";
import { key } from "./key";

import type { DataSource, Gallery } from "@riffyh/commons";
import type { NhentaiGallery } from "./types/NhentaiGallery";

const throttle = pThrottle({
  limit: 45,
  interval: 60 * 1000,
});

export const getGallery: DataSource["getGallery"] = throttle(async ({ id }) => {
  const data = await fetch(`https://nhentai.net/api/v2/galleries/${id.toString()}`).then((o) => {
    if (o.ok) return o.json() as Promise<NhentaiGallery>;
    else throw o;
  });

  const gallery: Gallery = {
    id: data.id.toString(),
    key,
    title: {
      display: data.title.english ?? data.title.pretty ?? data.title.japanese,
      original: data.title.japanese || null,
    },
    cover: {
      src: `https://t4.nhentai.net/${data.cover.path}`,
      width: data.cover.width,
      height: data.cover.height,
    },
    pages: data.pages.map((page) => ({
      order: page.number,
      src: `https://i4.nhentai.net/${page.path}`,
      width: page.width,
      height: page.height,
    })),
    tags: data.tags.map((tag) => ({
      id: tag.id.toString(),
      key,
      name: tag.name,
      type: tag.type,
      slug: tag.slug,
    })),
  };

  return gallery;
});
