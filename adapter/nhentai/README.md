# Riffy H nhentai Adapter

An adapter allowing access to the nhentai data source.

## Installation

1. Install the `@riffyh/adapter-nhentai` package.

```bash
bun add @riffyh/adapter-nhentai
```

2. Add the adapter to your server configuration.

```ts
import { nhentai } from "@riffyh/adapter-nhentai";
import type { Config } from "@riffyh/commons";

const config: Config = {
  dataSources: [nhentai()],
};

export default config;
```

## Configuration

### `apiKey`

- **Type:** `string`
- **Default:** `undefined`

Specifies your nhentai API key. Providing an API key allows you to fetch data from the source with a higher rate limit. You can obtain your API key from the [nhentai Settings page](https://nhentai.net/user/settings#apikeys).
