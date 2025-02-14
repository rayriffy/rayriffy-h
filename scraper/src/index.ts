#!/usr/bin/env node

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import { fetch } from './commands/fetch'
import { sync } from './commands/sync'

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
  .command('sync', 'sync data to database', () => {}, sync)
  .demandCommand(1)
  .parse()
