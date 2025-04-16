import kebabCase from "lodash/kebabCase";
import type { Hentai } from "@riffyh/commons";

export const sanitizeContent = (content: Hentai) => ({
  id: Number(content.id),
  media_id: content.media_id,
  title: content.title,
  images: {
    cover: content.images.cover,
    pages: content.images.pages,
  },
  tags: content.tags.map(o => ({
    id: kebabCase(o.name),
    type: o.type,
    name: o.name,
  })),
  num_pages: content.num_pages,
})
