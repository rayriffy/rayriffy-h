#!/usr/bin/env bun

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import path from "node:path";
import debug from "debug";

import { sync } from "./commands/sync";

import type { Config } from "@riffyh/commons";

const log = debug("riffyh:execute");

const configFile = process.env.RIFFYH_CONFIG_PATH || "./riffyh.config.ts";
const configPath = path.resolve(configFile);
log(`resolving config file at ${configPath}...`);
const config: Config = await import(configPath).then((o) => o.default);

yargs(hideBin(process.argv))
  .command("sync", "sync data to database", {}, () => sync(config))
  .demandCommand(1)
  .parse();
