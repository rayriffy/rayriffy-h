import { getBookData } from "./functions/getBookData";
import { getBookDetail } from "./functions/getBookDetail";
import { getBookImage } from "./functions/getBookImages";
import { key } from "./key";

import { TagType, type DataSource, type Gallery } from "@riffyh/commons";
import type { Options } from "./types/Options";
import { namespace } from "./constants/namespace";
import { tagTypeMap } from "./constants/tagTypeMap";

export const getGallery = async (
  { id }: Parameters<DataSource["getGallery"]>[0],
  options: Options,
): ReturnType<DataSource["getGallery"]> => {
  const [bookId, bookKey] = id.split(".");

  if (!bookId || !bookKey) throw new Error("unalbe to parse ids");

  const [bookDetail, bookData] = await Promise.all([
    getBookDetail(bookId, bookKey, options.userAgent),
    getBookData(bookId, bookKey, options.crt, options.userAgent),
  ]);

  // pick data in bookData that has biggest integer
  const maxSize = Math.max(...Object.keys(bookData.data).map((v) => Number(v)));

  const bookImages = await getBookImage(
    maxSize,
    bookId,
    bookKey,
    bookData.data[maxSize]!.id.toString(),
    bookData.data[maxSize]!.key,
    options.crt,
    options.userAgent,
  );

  const gallery: Gallery = {
    id: bookDetail.id.toString() + "." + bookDetail.key,
    key,
    title: {
      display: bookDetail.title,
      original: null,
    },
    cover: {
      src: bookDetail.thumbnails.base + bookDetail.thumbnails.main.path,
      width: bookDetail.thumbnails.main.dimensions[0],
      height: bookDetail.thumbnails.main.dimensions[1],
    },
    pages: bookImages.entries.map((page, i) => ({
      order: i + 1,
      src: bookImages.base + page.path,
      width: page.dimensions[0],
      height: page.dimensions[1],
    })),
    tags: bookDetail.tags.map((tag) => {
      return {
        id: tag.namespace ? namespace[tag.namespace]! : "tag" + ":" + tag.name.replace(/\s+/g, "+"),
        key,
        slug: tag.name,
        name: tag.name,
        type: tag.namespace ? tagTypeMap[tag.namespace]! : TagType.Tag,
      };
    }),
  };

  return gallery;
};
