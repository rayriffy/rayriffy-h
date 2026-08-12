#!/usr/bin/env bun

import { t, Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";
import { toon } from "@toon-tools/elysia";

import { defineCacheInstance } from "@rayriffy/filesystem";
import {
  galleryModel,
  galleryPageResultModel,
  galleryResultModel,
  getFullGallery,
  getGalleryPage,
  listingResultModel,
  type Config,
  type DataSource,
} from "@riffyh/commons";
import debug from "debug";
import path from "node:path";
import sharp from "sharp";
import { download, upload } from "./bytebin";
import { inspectSourceImage } from "./image";
import { secretbox, randomBytes } from "tweetnacl";
import { encodeBase64, decodeBase64 } from "tweetnacl-util";

const log = debug("riffyh:server");
const cache = defineCacheInstance();

log("warming up server...");

const configFile = process.env.RIFFYH_CONFIG_PATH || "./riffyh.config.ts";
const configPath = path.resolve(configFile);
log(`resolving config file at ${configPath}...`);
const config: Config = await import(configPath).then((o) => o.default);

try {
  if (
    typeof config.secretboxKey !== "string" ||
    decodeBase64(config.secretboxKey).length !== secretbox.keyLength
  )
    throw new Error("key length mismatch");
  // oxlint-disable-next-line no-unused-vars
} catch (_) {
  const generatedKey = encodeBase64(randomBytes(secretbox.keyLength));
  console.error(
    `unable to parse secret key. please either generate key via https://tweetnacl.js.org/#/secretbox or copy following key to configuration: ${generatedKey}`,
  );
  process.exit(1);
}

log(`loaded configuration with ${config.dataSources.length} data sources`);

const dataSourceKeys = t.Union(config.dataSources.map((o) => t.Literal(o.key)));
const isStoreExist = config.dataSources.find((dataSource) => dataSource.key === "store");

const withGallerySource = async <T>(
  query: { id: string; dataSource: string },
  resolve: (dataSource: DataSource, id: string) => Promise<T>,
) => {
  if (isStoreExist) {
    const stored = await resolve(isStoreExist, `${query.dataSource};${query.id}`).catch(() => null);
    if (stored !== null) return stored;
  }

  const dataSource = config.dataSources.find((candidate) => candidate.key === query.dataSource);
  if (!dataSource) throw new Error(`data source ${query.dataSource} not found`);
  return resolve(dataSource, query.id);
};

const server = new Elysia()
  .use(
    swagger({
      exclude: ["/_image"],
    }),
  )
  .use(toon())
  .use(cors())
  .get("/", ({ redirect }) => redirect("/swagger"))
  .get("/health", () => "healthy")
  .get(
    "/dataSources",
    () =>
      config.dataSources.map((o) => ({
        key: o.key,
        name: o.name,
        iconUrl: o.iconUrl,
      })),
    {
      response: t.Array(
        t.Object({
          key: t.String(),
          name: t.String(),
          iconUrl: t.String(),
        }),
      ),
    },
  )
  .get("/gallery", ({ query }) => withGallerySource(query, getFullGallery), {
    query: t.Object({
      id: t.String(),
      dataSource: dataSourceKeys,
    }),
    response: galleryModel,
  })
  .get(
    "/gallery/initial",
    ({ query }) => withGallerySource(query, (dataSource, id) => dataSource.getGallery({ id })),
    {
      query: t.Object({
        id: t.String(),
        dataSource: dataSourceKeys,
      }),
      response: galleryResultModel,
    },
  )
  .get(
    "/gallery/pages",
    ({ query }) =>
      withGallerySource(query, (dataSource, id) =>
        getGalleryPage(dataSource, {
          id,
          offset: query.offset,
          limit: query.limit,
        }),
      ),
    {
      query: t.Object({
        id: t.String(),
        dataSource: dataSourceKeys,
        offset: t.Integer({ minimum: 0 }),
        limit: t.Integer({ minimum: 1, maximum: 100 }),
      }),
      response: galleryPageResultModel,
    },
  )
  .get(
    "/listing",
    async ({ query }) => {
      const dataSource = config.dataSources.find((o) => o.key === query.dataSource);
      if (dataSource === undefined) throw new Error(`data source ${query.dataSource} not found`);

      return dataSource.getListing({
        searchQuery: query.query || null,
        page: query.page,
      });
    },
    {
      query: t.Object({
        query: t.Optional(t.String()),
        page: t.Number(),
        dataSource: dataSourceKeys,
      }),
      response: listingResultModel,
    },
  )
  .get(
    "/tag",
    async ({ query }) => {
      const dataSource = config.dataSources.find((o) => o.key === query.dataSource);
      if (dataSource === undefined) throw new Error(`data source ${query.dataSource} not found`);

      return dataSource.getTagListing({
        id: query.id,
        page: query.page,
      });
    },
    {
      query: t.Object({
        id: t.String(),
        page: t.Number(),
        dataSource: dataSourceKeys,
      }),
      response: listingResultModel,
    },
  )
  .post("/collection/export", ({ body }) => upload(body, config.secretboxKey), {
    body: t.String(),
  })
  .get("/collection/import", async ({ query }) => download(query.key, config.secretboxKey), {
    query: t.Object({
      key: t.String(),
    }),
  })
  .get(
    "/image",
    async ({ query }) => {
      const cacheKeys = [query.dataSource, query.url, query.format, query.type];

      const cachedImage = await cache.read<Buffer>(cacheKeys);
      if (cachedImage !== null) {
        const image = Buffer.from(cachedImage.data);
        const sourceImage = await inspectSourceImage(image);
        return new Response(image, {
          headers: {
            "Content-Type":
              sourceImage.format === "gif" ||
              (sourceImage.format === "webp" && sourceImage.isAnimated)
                ? `image/${sourceImage.format}`
                : `image/${query.format}`,
            "Cache-Control": "public, max-age=86400000",
          },
        });
      }

      const dataSource = config.dataSources.find((o) => o.key === query.dataSource);
      if (dataSource === undefined) throw new Error(`data source ${query.dataSource} not found`);

      const image = await dataSource.getImage({
        url: query.url,
      });
      const sourceImage = await inspectSourceImage(image);
      if (sourceImage.format === "gif") {
        if (query.format === "webp") {
          const resizedImage = await sharp(image, { animated: true })
            .resize({
              width: query.type === "cover" ? 640 : 1280,
            })
            .webp({ quality: 72 })
            .toBuffer();
          await cache.write(
            cacheKeys,
            resizedImage,
            86_400_000, // 1 month
          );
          return new Response(resizedImage, {
            headers: {
              "Content-Type": "image/webp",
              "Cache-Control": "public, max-age=86400",
              "CDN-Cache-Control": "public, max-age=2592000",
              "Cloudflare-CDN-Cache-Control": "public, max-age=2592000",
            },
          });
        }
        await cache.write(
          cacheKeys,
          image,
          86_400_000, // 1 month
        );
        return new Response(image, {
          headers: {
            "Content-Type": "image/gif",
            "Cache-Control": "public, max-age=86400",
            "CDN-Cache-Control": "public, max-age=2592000",
            "Cloudflare-CDN-Cache-Control": "public, max-age=2592000",
          },
        });
      }

      if (sourceImage.image === null) {
        if (sourceImage.format === "webp" && sourceImage.isAnimated && query.format === "jpeg") {
          await cache.write(
            cacheKeys,
            image,
            86_400_000, // 1 month
          );
          return new Response(image, {
            headers: {
              "Content-Type": "image/webp",
              "Cache-Control": "public, max-age=86400",
              "CDN-Cache-Control": "public, max-age=2592000",
              "Cloudflare-CDN-Cache-Control": "public, max-age=2592000",
            },
          });
        }

        const sharpImage = sharp(image, { animated: sourceImage.isAnimated }).resize({
          width: query.type === "cover" ? 640 : 1280,
        });
        const resizedImage = await (
          query.format === "webp"
            ? sharpImage.webp({ quality: 72 })
            : sharpImage.jpeg({ quality: 72 })
        ).toBuffer();
        await cache.write(
          cacheKeys,
          resizedImage,
          86_400_000, // 1 month
        );

        return new Response(resizedImage, {
          headers: {
            "Content-Type": `image/${query.format}`,
            "Cache-Control": "public, max-age=86400",
            "CDN-Cache-Control": "public, max-age=2592000",
            "Cloudflare-CDN-Cache-Control": "public, max-age=2592000",
          },
        });
      }

      sourceImage.image.resize(query.type === "cover" ? 640 : 1280);

      // if query.format is webp, then convert to webp
      if (query.format === "webp")
        sourceImage.image.webp({
          quality: 72,
        });
      else if (query.format === "jpeg")
        sourceImage.image.jpeg({
          quality: 72,
        });

      const resizedImage = await sourceImage.image.buffer();
      await cache.write(
        cacheKeys,
        resizedImage,
        86_400_000, // 1 month
      );

      return new Response(resizedImage, {
        headers: {
          "Content-Type": `image/${query.format}`,
          "Cache-Control": "public, max-age=86400",
          "CDN-Cache-Control": "public, max-age=2592000",
          "Cloudflare-CDN-Cache-Control": "public, max-age=2592000",
        },
      });
    },
    {
      query: t.Object({
        url: t.String(),
        format: t.Union([t.Literal("webp"), t.Literal("jpeg")]),
        type: t.Union([t.Literal("cover"), t.Literal("page")]),
        dataSource: dataSourceKeys,
      }),
    },
  )
  .listen({
    hostname: config.hostname ?? "0.0.0.0",
    port: config.port ?? 3000,
  });

export type Server = typeof server;

console.log(`🦊 Elysia is running at http://${server.server?.hostname}:${server.server?.port}`);
