# Riffy H

The missing pieces of nhentai.

## Requirements

- [Bun](https://bun.sh/)

## Building the data partition

Create a JavaScript file that default-exports an array of [`DatabaseCode`](./commons/src/@types/DatabaseCode.ts):

```js
// @ts-check
/** @type {import("@riffyh/commons/src").DatabaseCode[]} */
const codes = [
  // ...
]

export default codes
```

> [!TIP]
> For type safety, add the JSDoc type above and install `@riffyh/commons` in your `package.json`.

Then run the scraper to fetch data (choose one):

```sh
# Node fetch
bunx @riffyh/scraper fetch ./index.js

# Browser
bunx @riffyh/scraper fetch --browser ./index.js

# Headless browser
bunx @riffyh/scraper fetch --headless ./index.js
```

After running, a `data/` directory will be created in the current working directory.

## Development

Use the following commands to set up the development environment:

```sh
# Clone the project and navigate into the repository
git clone git@github.com:rayriffy/rayriffy-h.git
cd rayriffy-h

# Create a symlink to your data partition
ln -s <path-to-data-partition> ./web/data

# Install dependencies and start the project
bun i
cd web
bun run dev
```

Your app will be available at `http://localhost:5173`.

## Deployment

For production, a base image without the data partition is available. You can either copy the data partition into the image via a `Dockerfile` or mount it as a Docker volume.

```Dockerfile
FROM ghcr.io/rayriffy/riffyh-core as base

COPY data ./data

CMD ["./bun", "./build/index.js"]
```

## License

All **Riffy H** applications and libraries are licensed under the [MIT License](https://opensource.org/licenses/MIT). See the [`LICENSE`](LICENSE) file for details.
