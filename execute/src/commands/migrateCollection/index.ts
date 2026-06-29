import type { Config, Gallery } from "@riffyh/commons";
import fs from "node:fs/promises";
import type { OldCollection } from "./OldCollection";
import task from "tasuku";
import mongoose from "mongoose";
import { GalleryModel } from "@riffyh/database";

export const migrateCollection = async (
  config: Config,
  pathToCollectionJson: string,
  minify: boolean = false,
) =>
  task("migrate collection", async ({ setTitle, setError }) => {
    const fileContent = await fs.readFile(pathToCollectionJson, "utf-8");
    const oldCollection = JSON.parse(fileContent) as OldCollection[];

    const nhentaiAdapter = config.dataSources.find((o) => o.key === "nh");

    if (nhentaiAdapter === undefined) {
      setError("nhentai adapter not found, terminating...");
      process.exit(1);
    }

    const hasMongoUrl = process.env.MONGODB_URI !== undefined;
    if (hasMongoUrl) {
      await mongoose.connect(process.env.MONGODB_URI as string);
    }

    const collection: Omit<Gallery, "pages">[] = [];

    let successCount = 0;
    let failedCount = 0;
    const totalCount = oldCollection.length;

    const updateTitle = () =>
      setTitle(`migrating collection ${successCount} / ${totalCount} (${failedCount} failed)`);
    updateTitle();

    for (const oldItem of oldCollection) {
      let success = false;

      // Try fetching from database first if connected
      if (hasMongoUrl) {
        const doc = (await GalleryModel.findOne({
          key: "nh",
          id: oldItem.id.toString(),
        }).lean()) as any;

        if (doc) {
          collection.push({
            id: doc.id,
            key: doc.key,
            title: doc.title,
            language: doc.locale,
            cover: doc.cover,
            tags: doc.tags,
          });
          success = true;
        }
      }

      if (!success) {
        const nhGallery = await nhentaiAdapter
          .getGallery({
            id: oldItem.id.toString(),
          })
          .catch(() => null);

        if (nhGallery !== null) {
          const { pages: _pages, ...galleryWithoutPages } = nhGallery;
          collection.push(galleryWithoutPages);
          success = true;
        }
      }

      if (success) successCount++;
      else failedCount++;

      updateTitle();
    }

    // write output.json of collection
    setTitle("writing output.json...");
    await fs.writeFile(
      "./output.json",
      minify ? JSON.stringify(collection) : JSON.stringify(collection, null, 2),
    );

    if (hasMongoUrl) {
      await mongoose.disconnect();
    }

    setTitle(
      "collection migrated! please paste content of output.json to browser localstorage key riffyh:collection",
    );
  });
