#!/usr/bin/env bun

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import path from "node:path";
import debug from "debug";
import { secretbox, randomBytes } from "tweetnacl";
import { encodeBase64 } from "tweetnacl-util";

import { sync } from "./commands/sync";
import { migrate } from "./commands/migrate";

import type { Config } from "@riffyh/commons";

const log = debug("riffyh:execute");

const configFile = process.env.RIFFYH_CONFIG_PATH || "./riffyh.config.ts";
const configPath = path.resolve(configFile);
log(`resolving config file at ${configPath}...`);
const config: Config = await import(configPath).then((o) => o.default);

yargs(hideBin(process.argv))
  .command("sync", "sync data to database", {}, () => sync(config))
  .command("migrate <directory>", "migrate legacy hentai json files to database", {}, (argv) => {
    migrate(config, path.resolve(argv.directory as string));
  })
  .command("generate secretBox", "generate a secretbox key", {}, () => {
    console.log(`Generated secretbox key: ${encodeBase64(randomBytes(secretbox.keyLength))}`);
  })
  .demandCommand(1)
  .parse();
