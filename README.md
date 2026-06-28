# Riffy H v7

A decentralized, self-hosted, modularized manga gallery viewer.

This project is a complete overhaul of Riffy H v6. Unlike v6, which was deeply integrated with a single source and made creating new data sources difficult, v7 is designed from the ground up to be modular. We have separated the web client entirely from the API server, enabling you to host the API server yourself and easily integrate multiple distinct data sources.

## Setting Up Your Own Server

1. Initialize a new project and install the `@riffyh/commons` package.

```bash
bun init
bun add @riffyh/commons
```

2. Create a server configuration file named `riffyh.config.ts`. Configure your server and the data sources you wish to add. You can refer to the [example](./example) for a complete server configuration.

3. Install the `@riffyh/server` package and start the server.

```bash
bun add @riffyh/server
bun run server
```

## Adding Your Server to the Web Client

1. Navigate to the [settings page](https://h.riffy.in.th/settings).

2. Add your server to the list of servers. You can also provide extra headers for your requests if your server requires authentication.

## Configuration

The following options are available to be configured in your `riffyh.config.ts` file:

### `hostname`

- **Type:** `string`
- **Default:** `'0.0.0.0'`

Specifies the hostname of your server. The default is `'0.0.0.0'`, which makes the server accessible from any device on your network.

### `port`

- **Type:** `number`
- **Default:** `3000`

Specifies the port your server will run on.

### `secretboxKey`

- **Type:** `string`
- **Required:** Yes

A secretbox key used to encrypt data sent to external services. This key must be kept secret, unique, and never shared.

You can generate a new secretbox key by running:

```bash
bunx @riffyh/execute generate secretBox
```

### `dataSources`

- **Type:** `Array<`[`DataSource`](./commons/src/models/dataSourceModel.ts)`>`
- **Required:** Yes

A list of data sources to be used by your server. Please refer to the [Data Sources](#data-sources) section for more information.

### `store`

- **Type:** `Array<`[`Store`](./commons/src/models/storeModel.ts)`>`
- **Default:** `undefined`

A list of stores for each data source to be saved locally in the database via the `@riffyh/adapter-store` package.

## Data Sources

We currently provide the following officially supported data source adapters:

- [`@riffyh/adapter-nhentai`](./adapter/nhentai/)
- [`@riffyh/adapter-niyaniya`](./adapter/niyaniya/)
- [`@riffyh/adapter-store`](./adapter/store/)

Beyond these, you can easily create your own data source by writing a custom adapter that satisfies the [`DataSource`](./commons/src/models/dataSourceModel.ts) interface. This allows you to integrate essentially any data source into your server.

We welcome contributions to this project! If you create a custom data source adapter, feel free to submit a pull request to have your package listed as a community-supported data source.
