import task from "tasuku";
import mongoose from "mongoose";
import { GalleryModel } from "@riffyh/database";

import { getFullGallery, type Config, type Store, type DataSource } from "@riffyh/commons";

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

    let successCount = 0;
    let failedCount = 0;
    const totalCount = missingIds.length;

    const updateTitle = () =>
      setTitle(`${dataSource.name} ${successCount} / ${totalCount} (${failedCount} failed)`);
    updateTitle();

    // 3. fetch a complete gallery, aggregating progressive adapters when needed
    for (const id of missingIds) {
      try {
        const { language, ...gallery } = await getFullGallery(dataSource, id);

        // 4. if call is success, use mongoose to push to db. otherwise log item as failed
        await GalleryModel.create({
          ...gallery,
          locale: language,
        });

        successCount++;
      } catch {
        failedCount++;
      }

      // 5. setTitle to log of current progress
      updateTitle();
    }
  });
