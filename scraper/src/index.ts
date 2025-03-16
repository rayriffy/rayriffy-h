#!/usr/bin/env node

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import { fetch } from './commands/fetch'
import { sync } from './commands/sync'
import { doomsday } from "./commands/doomsday";

import 'dotenv/config'

yargs(hideBin(process.argv))
  .command<{ file: string, browser: boolean }>(
    'fetch <file>', 'fetch file from raw source',
    yargs => {
      yargs.option('browser', {
        type: 'boolean',
        describe:
          'fetch using full-browser mode in case of cloudflare protection turned on',
        default: false,
      });
    },
    argv => fetch(argv.file, argv.browser)
  )
  .command<{ concurrency: number }>(
    'doomsday',
    'download all images to data partition',
    yargs => {
      yargs.option('concurrency', {
        type: 'number',
        describe: 'number of concurrent downloads',
        default: 20,
      });
    },
    argv => doomsday(argv.concurrency)
  )
  .command('sync', 'sync data to database', () => {}, sync)
  .demandCommand(1)
  .parse()
