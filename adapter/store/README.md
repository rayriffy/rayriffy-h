# Riffy H Store Adapter

This is a special adapter used to retrieve archived gallery data from a database. When this adapter is included in your server, any request for gallery data will first check the local store. If the data is not found locally, the server will fall back to fetching it from the respective adapter as normal.

## Installation

1. Install the `@riffyh/adapter-store` package.

```bash
bun add @riffyh/adapter-store
```

2. Add the adapter to your server configuration.

```ts
import { store } from "@riffyh/adapter-store";
import type { Config } from "@riffyh/commons";

const config: Config = {
  dataSources: [
    store({
      mongoDBUri: "mongodb://...",
    }),
  ],
};

export default config;
```

## Configuration

### `mongoDBUri`

- **Type:** `string`
- **Required:** Yes

Your MongoDB connection string.
