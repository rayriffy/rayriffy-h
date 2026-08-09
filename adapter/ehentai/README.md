# Riffy H E-Hentai Adapter

Access E-Hentai and ExHentai through two data-source factories from one package.

## Installation

```sh
bun add @riffyh/adapter-ehentai
```

## Configuration

```ts
import { ehentai, exhentai } from "@riffyh/adapter-ehentai";
import type { Config } from "@riffyh/commons";

const config: Config = {
  secretboxKey: Bun.env.SECRETBOX_KEY!,
  dataSources: [
    ehentai(),
    exhentai({
      ipb_member_id: "…",
      ipb_pass_hash: "…",
      igneous: "…",
    }),
  ],
};

export default config;
```

`ehentai()` works without authentication. `exhentai()` requires an existing browser session:

1. Log in to [ExHentai](https://exhentai.org/) in your browser and open its front page.
2. Open DevTools, inspect the cookies for `https://exhentai.org`, then copy the **Value** for `ipb_member_id`, `ipb_pass_hash`, and `igneous` into the options above.

Treat the three values as passwords: keep the config file outside Git or ignored.

## Progressive gallery loading

The adapter returns title, cover, tags, language, and page count from `getGallery` without resolving every image page. `getGalleryPages` then resolves only the requested offset/limit window. The web reader requests these windows as the reader approaches them, while complete-gallery callers remain supported through the server and `getFullGallery` compatibility helper.
