#!/usr/bin/env bun
import { t, Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";
import { defineCacheInstance } from "@rayriffy/filesystem";
import sharp from "sharp";

import { galleryModel, listingResultModel, type Config } from "@riffyh/commons";
import debug from "debug";
import path from "node:path";

const log = debug("riffyh:server");
const cache = defineCacheInstance();

log("warming up server...");

const configFile = process.env.RIFFYH_CONFIG_PATH || "./riffyh.config.ts";
const configPath = path.resolve(configFile);
log(`resolving config file at ${configPath}...`);
const config: Config = await import(configPath).then((o) => o.default);

log(`loaded configuration with ${config.dataSources.length} data sources`);

const dataSourceKeys = t.Union(config.dataSources.map((o) => t.Literal(o.key)));

const server = new Elysia()
  .use(
    swagger({
      exclude: ["/_image"],
    }),
  )
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
  .get(
    "/gallery",
    async ({ query }) => {
      const dataSource = config.dataSources.find((o) => o.key === query.dataSource);
      if (dataSource === undefined) throw new Error(`data source ${query.dataSource} not found`);

      return dataSource.getGallery({
        id: query.id,
      });
    },
    {
      query: t.Object({
        id: t.String(),
        dataSource: t.String(),
      }),
      response: galleryModel,
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
    "/image",
    async ({ query }) => {
      const cacheKeys = [query.dataSource, query.url, query.format];

      const cachedImage = await cache.read<Buffer>(cacheKeys);
      if (cachedImage !== null)
        return new Response(Buffer.from(cachedImage.data), {
          headers: {
            "Content-Type": `image/${query.format}`,
            "Cache-Control": "public, max-age=86400000",
          },
        });

      const dataSource = config.dataSources.find((o) => o.key === query.dataSource);
      if (dataSource === undefined) throw new Error(`data source ${query.dataSource} not found`);

      const fetchedImage = await dataSource.getImage({
        url: query.url,
      });
      const resizedImage = await sharp(fetchedImage)
        .resize({
          width: 1280,
        })
        .toFormat(query.format, {
          quality: 72,
        })
        .toBuffer();
      await cache.write(
        cacheKeys,
        resizedImage,
        86_400_000, // 1 month
      );

      return new Response(resizedImage, {
        headers: {
          "Content-Type": `image/${query.format}`,
          "Cache-Control": "public, max-age=86400000",
        },
      });
    },
    {
      query: t.Object({
        url: t.String(),
        format: t.Union([t.Literal("webp"), t.Literal("jpg")]),
        dataSource: dataSourceKeys,
      }),
    },
  )
  .listen({
    hostname: "0.0.0.0",
    port: 3000,
  });

export type Server = typeof server;

console.log(`🦊 Elysia is running at http://${server.server?.hostname}:${server.server?.port}`);
