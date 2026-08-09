import { expect, test } from "bun:test";

import {
  getFullGallery,
  getGalleryPage,
  type DataSource,
  type Gallery,
  type GalleryMetadata,
} from "../src";

const pages: Gallery["pages"] = Array.from({ length: 5 }, (_, index) => ({
  order: index + 1,
  src: `https://img.example/${index + 1}.jpg`,
  width: 800,
  height: 1_200,
}));

const metadata: GalleryMetadata = {
  id: "gallery",
  key: "test",
  title: { display: "Gallery", original: null },
  language: null,
  cover: { src: "https://img.example/cover.jpg", width: 800, height: 1_200 },
  tags: [],
  pageCount: pages.length,
};

const baseDataSource = {
  key: "test",
  name: "Test",
  iconUrl: "",
  getListing: async () => ({ galleries: [], currentPage: 1, maximumPages: 1 }),
  getTagListing: async () => ({ galleries: [], currentPage: 1, maximumPages: 1 }),
  getImage: async () => Buffer.from([]),
};

test("slices full-gallery adapters into page chunks", async () => {
  const dataSource = {
    ...baseDataSource,
    getGallery: async () => {
      const { pageCount: _pageCount, ...galleryMetadata } = metadata;
      return { ...galleryMetadata, pages };
    },
  } satisfies DataSource;

  await expect(
    getGalleryPage(dataSource, { id: metadata.id, offset: 2, limit: 2 }),
  ).resolves.toEqual({
    pages: pages.slice(2, 4),
    nextOffset: 4,
  });
});

test("assembles progressive adapters for legacy full-gallery callers", async () => {
  const requestedOffsets: number[] = [];
  const dataSource = {
    ...baseDataSource,
    getGallery: async () => metadata,
    getGalleryPages: async ({ offset, limit }) => {
      requestedOffsets.push(offset);
      const resultPages = pages.slice(offset, offset + limit);
      const nextOffset = offset + resultPages.length;
      return {
        pages: resultPages,
        nextOffset: nextOffset < pages.length ? nextOffset : null,
      };
    },
  } satisfies DataSource;

  const gallery = await getFullGallery(dataSource, metadata.id);

  expect(gallery.pages).toEqual(pages);
  expect(requestedOffsets).toEqual([0]);
  expect("pageCount" in gallery).toBe(false);
});
