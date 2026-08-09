import type { DataSource } from "../models/dataSourceModel";
import type {
  Gallery,
  GalleryMetadata,
  GalleryPageRequest,
  GalleryPageResult,
  GalleryResult,
} from "../models/galleryModel";

const fullGalleryPageSize = 50;

const isFullGallery = (gallery: GalleryResult): gallery is Gallery => "pages" in gallery;

export const getGalleryPage = async (
  dataSource: DataSource,
  request: GalleryPageRequest,
): Promise<GalleryPageResult> => {
  if (dataSource.getGalleryPages) return dataSource.getGalleryPages(request);

  const gallery = await dataSource.getGallery({ id: request.id });
  if (!isFullGallery(gallery)) {
    throw new Error(`Data source ${dataSource.key} returned metadata without page support`);
  }

  const pages = gallery.pages.slice(request.offset, request.offset + request.limit);
  const nextOffset = request.offset + pages.length;

  return {
    pages,
    nextOffset: nextOffset < gallery.pages.length ? nextOffset : null,
  };
};

export const getFullGallery = async (dataSource: DataSource, id: string): Promise<Gallery> => {
  const gallery = await dataSource.getGallery({ id });
  if (isFullGallery(gallery)) return gallery;

  const pages = await collectGalleryPages(dataSource, gallery, id);
  const { pageCount: _pageCount, ...metadata } = gallery;
  return { ...metadata, pages };
};

const collectGalleryPages = async (
  dataSource: DataSource,
  metadata: GalleryMetadata,
  id: string,
) => {
  const pages: Gallery["pages"] = [];
  let offset = 0;

  while (offset < metadata.pageCount) {
    const result = await getGalleryPage(dataSource, {
      id,
      offset,
      limit: Math.min(fullGalleryPageSize, metadata.pageCount - offset),
    });

    if (result.pages.length === 0) {
      throw new Error(`Data source ${dataSource.key} returned an empty gallery page at ${offset}`);
    }

    pages.push(...result.pages);

    if (result.nextOffset === null) {
      offset += result.pages.length;
      break;
    }
    if (result.nextOffset <= offset) {
      throw new Error(`Data source ${dataSource.key} returned a non-advancing gallery offset`);
    }
    offset = result.nextOffset;
  }

  if (pages.length !== metadata.pageCount) {
    throw new Error(
      `Data source ${dataSource.key} returned ${pages.length} of ${metadata.pageCount} gallery pages`,
    );
  }

  return pages;
};
