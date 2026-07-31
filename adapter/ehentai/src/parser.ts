import * as cheerio from "cheerio";

import type { GalleryReference } from "./types";

export interface ListingPage {
  galleries: GalleryReference[];
  maximumPages: number;
}

export interface ImagePage {
  height: number;
  src: string;
  width: number;
}

const galleryPath = /^\/g\/(\d+)\/([^/]+)\/?$/;
const imagePath = /^\/s\/[^/]+\/\d+-(\d+)\/?$/;

const cssPixelDimension = (style: string | undefined, property: "width" | "height") => {
  const value = style?.match(new RegExp(`(?:^|;)\\s*${property}\\s*:\\s*(\\d+)px`, "i"))?.[1];
  return value ? Number.parseInt(value, 10) : 0;
};

export const parseGalleryReference = (href: string, baseUrl: string): GalleryReference | null => {
  const url = new URL(href, baseUrl);
  const match = galleryPath.exec(url.pathname);
  if (!match) return null;

  return {
    gid: match[1]!,
    token: match[2]!,
  };
};

export const parseListingPage = (html: string, baseUrl: string): ListingPage => {
  const $ = cheerio.load(html);
  const galleryReferences = new Map<string, GalleryReference>();

  $("a[href*='/g/']").each((_, element) => {
    const href = $(element).attr("href");
    if (!href) return;

    const reference = parseGalleryReference(href, baseUrl);
    if (reference) galleryReferences.set(`${reference.gid}.${reference.token}`, reference);
  });

  const maximumPages = Math.max(
    1,
    ...$(".ptt a")
      .map((_, element) => Number.parseInt($(element).text(), 10))
      .get()
      .filter(Number.isFinite),
  );

  return {
    galleries: [...galleryReferences.values()],
    maximumPages,
  };
};

export const parseGalleryImagePages = (html: string, baseUrl: string) => {
  const $ = cheerio.load(html);
  const imagePages = new Map<number, string>();

  $("#gdt a[href*='/s/']").each((_, element) => {
    const href = $(element).attr("href");
    if (!href) return;

    const url = new URL(href, baseUrl);
    const match = imagePath.exec(url.pathname);
    if (!match) return;

    imagePages.set(Number(match[1]), url.toString());
  });

  return [...imagePages.entries()]
    .map(([order, url]) => ({ order, url }))
    .sort((left, right) => left.order - right.order);
};

export const parseImagePage = (html: string): ImagePage => {
  const $ = cheerio.load(html);
  const image = $("#i3 img").first();
  const src = image.attr("src");
  if (!src) throw new Error("Unable to locate gallery image");

  const style = image.attr("style");
  return {
    src,
    width:
      cssPixelDimension(style, "width") || Number.parseInt(image.attr("width") ?? "0", 10) || 0,
    height:
      cssPixelDimension(style, "height") || Number.parseInt(image.attr("height") ?? "0", 10) || 0,
  };
};
