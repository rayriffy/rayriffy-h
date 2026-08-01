import { TagType, type DataSource, type Gallery, type ListingResult } from "@riffyh/commons";
import pThrottle from "p-throttle";

import { getLanguage } from "./language";
import { parseGalleryImagePages, parseImagePage, parseListingPage } from "./parser";
import type {
  ExHentaiOptions,
  GalleryHost,
  GalleryMetadata,
  GalleryReference,
  Options,
} from "./types";

const defaultUserAgent =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36";
const exHentaiCookies = ["ipb_member_id", "ipb_pass_hash", "igneous"] as const;

const galleryMetadataLimit = 25;
const galleryPageRequests = pThrottle({
  limit: 10,
  interval: 1_000,
});
const imagePageRequests = pThrottle({
  limit: 25,
  interval: 1_000,
});

const getBaseUrl = (host: GalleryHost) => `https://${host}`;

const createCookie = (options: Options, host: GalleryHost) => {
  if (host !== "exhentai.org") return;

  const credentials = options as Partial<ExHentaiOptions>;
  const missing = exHentaiCookies.filter((name) => !credentials[name]);
  if (missing.length > 0) {
    throw new Error(`ExHentai requires: ${missing.join(", ")}`);
  }

  if (exHentaiCookies.some((name) => /[\r\n;]/.test(credentials[name]!))) {
    throw new Error("ExHentai option values must not contain line breaks or semicolons");
  }

  return exHentaiCookies.map((name) => `${name}=${credentials[name]}`).join("; ");
};

const tagType = (namespace: string) => {
  switch (namespace) {
    case "artist":
      return TagType.Artist;
    case "character":
      return TagType.Character;
    case "group":
      return TagType.Group;
    case "language":
      return TagType.Language;
    case "parody":
      return TagType.Parody;
    default:
      return TagType.Tag;
  }
};

const toTags = (metadata: GalleryMetadata, key: string) => [
  {
    id: `category:${metadata.category.toLowerCase()}`,
    key,
    name: metadata.category,
    slug: metadata.category.toLowerCase().replaceAll(" ", "-"),
    type: TagType.Category,
  },
  ...metadata.tags.map((rawTag) => {
    const separator = rawTag.indexOf(":");
    const namespace = separator === -1 ? "tag" : rawTag.slice(0, separator);
    const name = separator === -1 ? rawTag : rawTag.slice(separator + 1);

    return {
      id: rawTag,
      key,
      name,
      slug: name.toLowerCase().replaceAll(" ", "-"),
      type: tagType(namespace),
    };
  }),
];

const parseReference = (id: string): GalleryReference => {
  const separator = id.indexOf(".");
  if (separator === -1) throw new Error(`Invalid gallery id: ${id}`);

  const gid = id.slice(0, separator);
  const token = id.slice(separator + 1);
  if (!/^\d+$/.test(gid) || !token) throw new Error(`Invalid gallery id: ${id}`);

  return { gid, token };
};

export class EhentaiClient {
  readonly baseUrl: string;
  readonly cookie?: string;
  readonly host: GalleryHost;
  readonly userAgent: string;

  constructor(host: GalleryHost, options: Options = {}) {
    this.baseUrl = getBaseUrl(host);
    this.cookie = createCookie(options, host);
    this.host = host;
    this.userAgent = options.userAgent ?? defaultUserAgent;
  }

  async getListing({ searchQuery, page }: Parameters<DataSource["getListing"]>[0]) {
    if (!Number.isInteger(page) || page < 1) throw new Error("Page must be a positive integer");

    const url = new URL(this.baseUrl);
    if (searchQuery) url.searchParams.set("f_search", searchQuery);
    if (page > 1) url.searchParams.set("page", String(page - 1));

    const listing = parseListingPage(await this.fetchText(url), this.baseUrl);
    const metadata = await this.getMetadata(listing.galleries);

    return {
      galleries: metadata.map((gallery) => this.toListingGallery(gallery)),
      currentPage: page,
      maximumPages: listing.maximumPages,
    } satisfies ListingResult;
  }

  async getTagListing({ id, page }: Parameters<DataSource["getTagListing"]>[0]) {
    const separator = id.indexOf(":");
    if (separator === -1) throw new Error(`Invalid tag id: ${id}`);

    const namespace = id.slice(0, separator);
    const name = id.slice(separator + 1).replaceAll('"', "");
    return this.getListing({
      page,
      searchQuery: `${namespace}:"${name}"`,
    });
  }

  async getGallery({ id }: Parameters<DataSource["getGallery"]>[0]) {
    const reference = parseReference(id);
    const galleryUrl = new URL(`/g/${reference.gid}/${reference.token}/`, `${this.baseUrl}/`);
    const [metadataResult, firstGalleryPage] = await Promise.all([
      this.getMetadata([reference]),
      this.fetchText(galleryUrl),
    ]);
    const metadata = metadataResult[0];
    if (!metadata) throw new Error(`Gallery not found: ${id}`);

    const imagePages = await this.getGalleryImagePages(metadata, firstGalleryPage);
    const pages = await Promise.all(
      imagePages.map(({ order, url }) =>
        imagePageRequests(async () => {
          const image = parseImagePage(await this.fetchText(url));
          return { order, ...image };
        })(),
      ),
    );

    return {
      id: `${metadata.gid}.${metadata.token}`,
      key: this.key,
      title: {
        display: metadata.title,
        original: metadata.title_jpn ?? null,
      },
      cover: {
        src: metadata.thumb,
        width: 0,
        height: 0,
      },
      language: getLanguage(metadata),
      pages,
      tags: toTags(metadata, this.key),
    } satisfies Gallery;
  }

  async getImage({ url }: Parameters<DataSource["getImage"]>[0]) {
    const response = await fetch(url, {
      headers: {
        Referer: `${this.baseUrl}/`,
        "User-Agent": this.userAgent,
      },
    });
    if (!response.ok) throw new Error(`Unable to fetch image: ${response.status}`);
    return Buffer.from(await response.arrayBuffer());
  }

  get key() {
    return this.host === "e-hentai.org" ? "eh" : "ex";
  }

  private async getMetadata(references: GalleryReference[]) {
    const chunks = Array.from(
      { length: Math.ceil(references.length / galleryMetadataLimit) },
      (_, index) =>
        references.slice(index * galleryMetadataLimit, (index + 1) * galleryMetadataLimit),
    );
    const responses = await Promise.all(chunks.map((chunk) => this.fetchMetadata(chunk)));
    return responses.flat();
  }

  private async fetchMetadata(references: GalleryReference[]) {
    if (references.length === 0) return [];

    const response = await this.fetchJson<{ gmetadata?: GalleryMetadata[] }>(
      new URL("api.php", `${this.baseUrl}/`),
      {
        method: "POST",
        body: JSON.stringify({
          method: "gdata",
          gidlist: references.map(({ gid, token }) => [Number(gid), token]),
          namespace: 1,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.gmetadata?.filter((metadata) => !("error" in metadata)) ?? [];
  }

  private async getGalleryImagePages(metadata: GalleryMetadata, firstGalleryPage: string) {
    const fileCount = Number(metadata.filecount);
    const maximumPages = Math.max(1, Math.ceil(fileCount / 10));
    const galleryPages = await Promise.all(
      Array.from({ length: maximumPages }, (_, page) => {
        if (page === 0) return firstGalleryPage;

        const url = new URL(`/g/${metadata.gid}/${metadata.token}/`, `${this.baseUrl}/`);
        url.searchParams.set("p", String(page));
        return galleryPageRequests(() => this.fetchText(url))();
      }),
    );
    const imagePages = new Map<number, string>();
    galleryPages.forEach((galleryPage) => {
      parseGalleryImagePages(galleryPage, this.baseUrl).forEach(({ order, url }) => {
        imagePages.set(order, url);
      });
    });

    if (imagePages.size !== fileCount) {
      throw new Error(`Unable to resolve every image page for gallery ${metadata.gid}`);
    }

    return [...imagePages.entries()]
      .map(([order, url]) => ({ order, url }))
      .sort((left, right) => left.order - right.order);
  }

  private toListingGallery(metadata: GalleryMetadata) {
    return {
      id: `${metadata.gid}.${metadata.token}`,
      key: this.key,
      title: {
        display: metadata.title,
        original: metadata.title_jpn ?? null,
      },
      cover: {
        src: metadata.thumb,
        width: 0,
        height: 0,
      },
      language: getLanguage(metadata),
    } satisfies ListingResult["galleries"][number];
  }

  private async fetchText(url: URL | string) {
    const response = await fetch(url, { headers: this.headers });
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    return response.text();
  }

  private async fetchJson<T>(url: URL, init: RequestInit) {
    const response = await fetch(url, {
      ...init,
      headers: {
        ...this.headers,
        ...init.headers,
      },
    });
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    return response.json() as Promise<T>;
  }

  private get headers() {
    return {
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      ...(this.cookie ? { Cookie: this.cookie } : {}),
      "User-Agent": this.userAgent,
    };
  }
}
