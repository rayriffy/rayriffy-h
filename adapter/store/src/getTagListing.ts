import type { DataSource } from "@riffyh/commons";
import { GalleryModel } from "@riffyh/database";
import { connectDb } from "./db";
import type { Options } from "./Options";

export const getTagListing =
  (adapterOptions: Options): DataSource["getTagListing"] =>
  async ({ id, page }) => {
    await connectDb(adapterOptions);

    const [key, actualId] = id.split(";");
    if (!key || !actualId) {
      throw new Error(`Invalid tag id format. Expected <key>;<id>, got ${id}`);
    }

    const limit = 20;
    const skip = (page - 1) * limit;

    const query = {
      tags: {
        $elemMatch: {
          key,
          id: actualId,
        },
      },
    };

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
