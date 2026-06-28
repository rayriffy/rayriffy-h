import type { DataSource } from "@riffyh/commons";
import { connectDb } from "./db";
import { GalleryModel } from "@riffyh/database";
import type { Options } from "./Options";

export const getGallery =
  (adapterOptions: Options): DataSource["getGallery"] =>
  async ({ id }) => {
    await connectDb(adapterOptions);

    const [key, actualId] = id.split(";");
    if (!key || !actualId) {
      throw new Error(`Invalid id format. Expected <key>;<id>, got ${id}`);
    }

    const doc = (await GalleryModel.findOne({ key, id: actualId }).lean()) as any;

    if (!doc) {
      throw new Error(`Gallery not found: ${id}`);
    }

    return {
      id: doc.id,
      key: doc.key,
      title: doc.title,
      language: doc.locale,
      cover: doc.cover,
      pages: doc.pages,
      tags: doc.tags,
    };
  };
