import task from "tasuku";
import mongoose from "mongoose";
import fs from "node:fs/promises";
import path from "node:path";
import pThrottle from "p-throttle";
import { GalleryModel } from "@riffyh/database";

import type { Config, Gallery } from "@riffyh/commons";
import { getImageUrl } from "./getImageUrl";

const searchTag = pThrottle({
  limit: 28,
  interval: 60 * 1000,
})(async (type: string, query: string) => {
  const res = await fetch("https://nhentai.net/api/v2/tags/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type, query, limit: 10 }),
  });

  await new Promise((resolve) => setTimeout(resolve, 500));

  if (!res.ok) {
    throw new Error(`Failed to fetch tag: ${res.statusText}`);
  }

  return res.json() as Promise<any[]>;
});

export const migrateDatabase = async (config: Config, pathToLegacyHentaiDirectory: string) =>
  task("migrate db", async ({ setError, setTitle }) => {
    if (process.env.MONGODB_URI === undefined) throw new Error("mongo url not provided");

    const nhentaiDataSource = config.dataSources.find((dataSource) => dataSource.key === "nh");
    if (!nhentaiDataSource) {
      setError(
        "unable to locate nhentai dataSrouce, this required for migrating old dataset to new database",
      );
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGODB_URI);

    setTitle("Fetching existing IDs and Tags from database...");

    const existingDocs = await GalleryModel.find({ key: "nh" }, "id").lean();
    const existingIds = new Set(existingDocs.map((doc: any) => doc.id));

    // Aggregate to get all unique tags from database to map legacy tags by name
    const existingTagsAggregation = await GalleryModel.aggregate([
      { $unwind: "$tags" },
      { $group: { _id: "$tags.name", tag: { $first: "$tags" } } },
    ]);
    const tagMap = new Map<string, any>(existingTagsAggregation.map((t: any) => [t._id, t.tag]));

    const files = await fs.readdir(pathToLegacyHentaiDirectory);
    const jsonFiles = files.filter((f: string) => f.endsWith(".json") && /^\d+\.json$/.test(f));
    const allIds = jsonFiles.map((f: string) => f.replace(".json", ""));
    const missingIds = allIds.filter((id: string) => !existingIds.has(id));

    let successCount = 0;
    let failedCount = 0;
    const totalCount = missingIds.length;

    const updateTitle = () =>
      setTitle(`Migrating ${successCount} / ${totalCount} (${failedCount} failed)`);
    updateTitle();

    for (const id of missingIds) {
      try {
        const filePath = path.join(pathToLegacyHentaiDirectory, `${id}.json`);
        const fileContent = await fs.readFile(filePath, "utf-8");
        const legacyGallery = JSON.parse(fileContent);

        const newTags: any[] = [];
        for (const legacyTag of legacyGallery.tags) {
          const existingTag = tagMap.get(legacyTag.name);
          if (existingTag) {
            newTags.push(existingTag);
          } else {
            try {
              const apiTags = await searchTag(legacyTag.type, legacyTag.name);
              const matchedApiTag =
                apiTags.find((t: any) => t.name === legacyTag.name) || apiTags[0];

              if (matchedApiTag) {
                const newTag = {
                  id: matchedApiTag.id.toString(),
                  key: "nh",
                  slug: matchedApiTag.slug,
                  name: matchedApiTag.name,
                  type: matchedApiTag.type,
                };
                newTags.push(newTag);
                tagMap.set(legacyTag.name, newTag);
              } else {
                console.log(
                  `Gallery ${id} missing tag name: ${legacyTag.name}, not found in API either.`,
                );
              }
            } catch (err) {
              console.error(`Gallery ${id} failed to fetch tag ${legacyTag.name}:`, err);
            }
          }
        }

        const getLanguageFromLegacyTags = (tags: any[]) => {
          const languageTagNames = tags
            .filter((t: any) => t.type === "language")
            .map((t: any) => t.name.toLowerCase());
          if (languageTagNames.includes("english")) return "en";
          if (languageTagNames.includes("chinese")) return "cn";
          if (languageTagNames.includes("japanese")) return "jp";
          return null;
        };

        const gallery: Gallery = {
          id: id.toString(),
          key: "nh",
          title: {
            display:
              legacyGallery.title.english ??
              legacyGallery.title.pretty ??
              legacyGallery.title.japanese,
            original: legacyGallery.title.japanese || null,
          },
          cover: {
            src: getImageUrl({
              image: legacyGallery.images.cover,
              mediaId: legacyGallery.media_id,
              type: "cover",
            }),
            width: legacyGallery.images.cover.w,
            height: legacyGallery.images.cover.h,
          },
          language: getLanguageFromLegacyTags(legacyGallery.tags),
          pages: legacyGallery.images.pages.map((page: any, i: number) => ({
            order: i + 1,
            src: getImageUrl({
              image: page,
              mediaId: legacyGallery.media_id,
              type: "gallery",
              page: i + 1,
            }),
            width: page.w,
            height: page.h,
          })),
          tags: newTags,
        };

        const { language, ...galleryData } = gallery;

        await GalleryModel.create({
          ...galleryData,
          locale: language,
        });

        successCount++;
      } catch (err) {
        failedCount++;
        console.error(`Failed to migrate gallery ${id}:`, err);
      }
      updateTitle();
    }

    await mongoose.disconnect();
  });
