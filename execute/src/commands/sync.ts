import task from "tasuku";
import mongoose from "mongoose";
import { GalleryModel } from "@riffyh/database";

import type { Config, Store, DataSource } from "@riffyh/commons";

export const sync = async (config: Config) => {
  if (process.env.MONGODB_URI === undefined) throw new Error("mongo url not provided");

  await mongoose.connect(process.env.MONGODB_URI);

  if (config.store) {
    for (const store of config.store) {
      await storeIterator(store, config.dataSources);
    }
  }

  await mongoose.disconnect();
};

const storeIterator = async (store: Store, dataSources: DataSource[]) =>
  task(store.key, async ({ setTitle, setError }) => {
    const dataSource = dataSources.find((d) => d.key === store.key);

    if (!dataSource) {
      setError("data source for " + store.key + " not found");
      return;
    }

    setTitle(dataSource.name);

    // 1. get list of ids that already exist in mongoose db (find multiple by key)
    const existingDocs = await GalleryModel.find({ key: store.key }, "id").lean();
    const existingIds = new Set(existingDocs.map((doc: any) => doc.id));

    // 2. compute list of ids that does not yet exist in db
    const missingIds = store.ids.filter((id) => !existingIds.has(id));

    let successCount = store.ids.length - missingIds.length;
    let failedCount = 0;
    const totalCount = store.ids.length;

    const updateTitle = () =>
      setTitle(`${dataSource.name} ${successCount} / ${totalCount} (${failedCount} failed)`);
    updateTitle();

    // 3. from those list do a foreach await loop to get gallery data via dataSource.getGallery()
    for (const id of missingIds) {
      try {
        const gallery = await dataSource.getGallery({ id });

        // 4. if call is success, use mongoose to push to db. otherwise log item as failed
        await GalleryModel.create(gallery);

        successCount++;
      } catch {
        failedCount++;
      }

      // 5. setTitle to log of current progress
      updateTitle();
    }
  });
