import type { ListingResult } from "@riffyh/commons";
import { GalleryModel } from "@riffyh/database";
import { connectDb } from "./db";
import { parseQuery } from "./queryParser";

export const getListing = async (options: {
  searchQuery: string | null;
  page: number;
}): Promise<ListingResult> => {
  await connectDb();

  const query = parseQuery(options.searchQuery);
  const limit = 20;
  const skip = (options.page - 1) * limit;

  const [total, docs] = await Promise.all([
    GalleryModel.countDocuments(query),
    GalleryModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
  ]);

  const maximumPages = Math.ceil(total / limit);

  return {
    galleries: docs.map((doc) => ({
      id: doc.id,
      key: doc.key,
      title: doc.title,
      language: doc.locale,
      cover: doc.cover,
      tags: doc.tags,
    })),
    currentPage: options.page,
    maximumPages,
  };
};
