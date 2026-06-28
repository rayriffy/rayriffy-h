import type { DataSource } from "@riffyh/commons";
import { GalleryModel } from "@riffyh/database";
import { connectDb } from "./db";
import { parseQuery } from "./queryParser";
import type { Options } from "./Options";

export const getListing =
  (adapterOptions: Options): DataSource["getListing"] =>
  async ({ page, searchQuery }) => {
    await connectDb(adapterOptions);

    const query = parseQuery(searchQuery);
    const limit = 20;
    const skip = (page - 1) * limit;

    const [total, docs] = await Promise.all([
      GalleryModel.countDocuments(query),
      GalleryModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean() as any,
    ]);

    const maximumPages = Math.ceil(total / limit);

    return {
      galleries: docs.map((doc: any) => ({
        id: doc.id,
        key: doc.key,
        title: doc.title,
        language: doc.locale,
        cover: doc.cover,
        tags: doc.tags,
      })),
      currentPage: page,
      maximumPages,
    };
  };
