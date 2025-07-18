#!/usr/bin/env node

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import { fetch } from './commands/fetch'
import { sync } from './commands/sync'
import { doomsday } from "./commands/doomsday";
import { version } from './commands/version';

import 'dotenv/config'

yargs(hideBin(process.argv))
  .command<{ file: string, browser: boolean, headless: boolean, concurrency: number }>(
    'fetch <file>', 'fetch file from raw source',
    yargs => {
      yargs.option('browser', {
        type: 'boolean',
        describe:
          'fetch using full-browser mode in case of cloudflare protection turned on',
        default: false,
      });
      yargs.option('headless', {
        type: 'boolean',
        describe: 'run puppeteer in headless mode (visible browser by default)',
        default: false,
      });
      yargs.option('concurrency', {
        type: 'number',
        describe: 'number of concurrent fetch operations',
        default: 8,
      });
    },
    argv => fetch(argv.file, argv.browser, argv.headless, argv.concurrency)
  )
  .command<{ concurrency: number, verbose: boolean }>(
    'doomsday',
    'download all images to data partition',
    yargs => {
      yargs.option('concurrency', {
        type: 'number',
        describe: 'number of concurrent downloads',
        default: 20,
      });
      yargs.option('verbose', {
        type: 'boolean',
        describe: 'print verbose output',
        default: false,
      });
    },
    argv => doomsday(argv.concurrency, argv.verbose)
  )
  .command('sync', 'sync data to database', () => {}, sync)
  .command('version', 'print version', () => {}, version)
  .demandCommand(1)
  .parse()
