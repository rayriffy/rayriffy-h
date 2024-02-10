#!/usr/bin/env bun

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import { fetch } from './commands/fetch'
import { sync } from './commands/sync'
import { seed } from './commands/seed'

yargs(hideBin(process.argv))
  .command<{ file: string }>('fetch <file>', 'fetch file from raw source', () => {}, argv => fetch(argv.file))
  .command('sync', 'sync data to database', () => {}, sync)
  .command('seed', 'generate cache table on database', () => {}, seed)
  .demandCommand(1)
  .parse()
