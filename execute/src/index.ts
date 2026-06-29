#!/usr/bin/env bun

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import path from "node:path";
import debug from "debug";
import { secretbox, randomBytes } from "tweetnacl";
import { encodeBase64 } from "tweetnacl-util";

import { sync } from "./commands/sync";
import { migrateDatabase } from "./commands/migrateDatabase";
import { migrateCollection } from "./commands/migrateCollection";

import type { Config } from "@riffyh/commons";

const log = debug("riffyh:execute");

const configFile = process.env.RIFFYH_CONFIG_PATH || "./riffyh.config.ts";
const configPath = path.resolve(configFile);
log(`resolving config file at ${configPath}...`);
const config: Config = await import(configPath).then((o) => o.default);

yargs(hideBin(process.argv))
  .command("sync", "sync data to database", {}, () => sync(config))
  .command("migrate", "migration commands", (y) =>
    y
      .command(
        "collection <json-file>",
        "migrate legacy collection json file to database",
        (y) =>
          y.option("minify", {
            type: "boolean",
            description: "Write output.json as minified JSON",
            default: false,
          }),
        (argv) => {
          migrateCollection(
            config,
            path.resolve(argv["json-file"] as string),
            argv.minify as boolean,
          );
        },
      )
      .command("db <directory>", "migrate legacy hentai json files to database", {}, (argv) => {
        migrateDatabase(config, path.resolve(argv.directory as string));
      })
      .demandCommand(1, "You need at least one command before moving on"),
  )
  .command("generate", "generation commands", (y) =>
    y
      .command("secretBox", "generate a secretbox key", {}, () => {
        console.log(`Generated secretbox key: ${encodeBase64(randomBytes(secretbox.keyLength))}`);
      })
      .demandCommand(1, "You need at least one command before moving on"),
  )
  .demandCommand(1)
  .parse();
