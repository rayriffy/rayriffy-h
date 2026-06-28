# Riffy H niyaniya Adapter

An adapter allowing access to the niyaniya.moe data source.

## Installation

1. Install the `@riffyh/adapter-niyaniya` package.

```bash
bun add @riffyh/adapter-niyaniya
```

2. Add the adapter to your server configuration.

```ts
import { niyaniya } from "@riffyh/adapter-niyaniya";
import type { Config } from "@riffyh/commons";

const config: Config = {
  dataSources: [
    niyaniya({
      crt: "<crt key>",
      userAgent: "<browser user agent>",
    }),
  ],
};

export default config;
```

## Configuration

### `crt`

- **Type:** `string`
- **Required:** Yes

Specifies the `crt` key for niyaniya.moe. You can obtain this key by monitoring network traffic in your browser's DevTools. The `crt` token should appear in the query parameters of certain requests (try navigating through a couple of galleries to find it).

_Note: This key may need to be rotated periodically._

### `userAgent`

- **Type:** `string`
- **Required:** Yes

The browser user agent used when obtaining the `crt` token. You can sniff this from the fetch request headers or by running `navigator.userAgent` in your browser's DevTools console.
