# Riffy H

The missing pieces of nhentai

## Requirements

- [bun](https://bun.sh/)

## Development

```
# Run local database cache server
docker-compose up -d

# Copy .env.example file and please adjust it accordingly
cp .env.example .env

# Fetch data to local cache
bun run fetch:data

# Start development server
bun run dev
```

## Build

```
bun run build
```

More updated instructions please see CI specification, and Dockerfile

## License

All of **Riffy H** application and libraries are licensed under the [MIT licence](https://opensource.org/licenses/MIT). Please see [the licence file](LICENCE) for more information. [tl;dr](https://tldrlegal.com/license/mit-license) you can do whatever you want as long as you include the original copyright and license notice in any copy of the software/source.
