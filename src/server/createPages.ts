import _ from 'lodash'

import axios from 'axios'
import { TaskQueue } from 'cwait'
import fs from 'fs'
import path from 'path'

import { CreatePagesArgs } from 'gatsby'

import databaseCodes from '../../contents/database/codes'
import databaseTags from '../../contents/database/tags'

import { getRawData } from './services/getRawData'
import { tagFilter } from './services/tagFilter'

import { IFetchedRaw } from '../core/@types/IFetchedRaw'
import { IHentai } from '../core/@types/IHentai'
import { ITag } from '../core/@types/ITag'

const ROOT_DIR = '../..'

const MAX_SIMULTANEOUS_DOWNLOADS = 3
const PREFETCH_GIST = 'https://gist.githubusercontent.com/rayriffy/09554279046d2fda29c125e0a16dc695/raw/crawler.json'

export const createPages = async ({actions, reporter}: CreatePagesArgs) => {
  const {createPage} = actions

  /**
   * Handler function for file sync
   * @param {err} id Error information
   */
  const fshandler = (err: any) => {
    if (err) {
      reporter.log(err)
      throw err
    }
  }

  // Download file from cache if cache does not exist
  if (!fs.existsSync(`${ROOT_DIR}/.tmp/crawler.json`)) {
    reporter.info(`Downloading prefetched data from GitHub Gist`)
    const gistCache = await axios.get(PREFETCH_GIST)

    if (!fs.existsSync(`${ROOT_DIR}/.tmp`)) {
      fs.mkdirSync(`${ROOT_DIR}/.tmp`)
    }

    await fs.writeFile(`${ROOT_DIR}/.tmp/crawler.json`, JSON.stringify(gistCache.data), fshandler)
  } else {
    reporter.info(`Found cache! Skipping prefetch stage`)
  }

  // Begin to fetch data
  const queue = new TaskQueue(Promise, MAX_SIMULTANEOUS_DOWNLOADS)
  const fetchedData = {
    tags: databaseTags,
    codes: await Promise.all(
      databaseCodes.map(queue.wrap(async (item: any) => await getRawData(item.code ? item.code : item, item.exclude ? item.exclude : [], reporter))),
    ),
  }

  /**
   * Filter errors and assign contants
   */
  const healthyResults: IFetchedRaw[] = _.filter(fetchedData.codes, o => o.status === 'success')

  const tagStack = fetchedData.tags

  /**
   * Create listing page
   */
  createPage({
    path: `listing`,
    component: path.resolve(`${ROOT_DIR}/src/templates/listing.js`),
    context: {
      subtitle: `listing`,
      raw: healthyResults.reverse(),
    },
  })

  /**
   * Create gallery pages
   */
  const postPrefix = 'r'
  _.each(healthyResults, node => {
    createPage({
      path: `${postPrefix}/${node.data.id}`,
      component: path.resolve(`${ROOT_DIR}/src/templates/post.js`),
      context: {
        id: node.data.id,
        raw: node.data.raw,
        exclude: node.data.exclude,
      },
    })
  })

  /**
   * Create hentai listing pages for each tags
   * @param {string} pathPrefix   Tag path prefix
   * @param {object} nodes  Filtered tag object
   * @param {string} name        Tag name
   */
  const createSlugPages = (pathPrefix: string, name: string, nodes: ITag[]) => {
    _.each(nodes, tag => {
      const qualifiedResults: IFetchedRaw[] = []

      _.each(healthyResults, node => {
        if (node) {
          if (!_.isEmpty(_.filter(node.data.raw.tags, o => o.id === tag.id))) { qualifiedResults.push(node) }
        }
      })

      createPage({
        path: `${pathPrefix}/${tag.id}`,
        component: path.resolve(`${ROOT_DIR}/src/templates/listing.js`),
        context: {
          subtitle: `${name}/${tag.name}`,
          raw: qualifiedResults,
          tagStack,
        },
      })
    })
  }

  /**
   * Creating tag listing and pages recursively
   */
  _.each(tagStack, node => {
    // Find all possible tags
    const nodes: ITag[] = tagFilter(healthyResults, node.name)

    // Create hentai listings by tag
    createSlugPages(node.prefix, node.name, nodes)

    createPage({
      path: `${node.prefix}`,
      component: path.resolve(`${ROOT_DIR}/src/templates/tag.js`),
      context: {
        prefix: node.prefix,
        subtitle: `${node.name}`,
        raw: nodes,
      },
    })
  })

  /**
   * Put all healthy results into cache
   */
  fs.writeFile(`${ROOT_DIR}/.tmp/crawler.json`, JSON.stringify(healthyResults), fshandler)

  /**
   * Preparing to generate API
   */
  const apiPath = 'api'
  const chunks: IFetchedRaw[][] = _.chunk(healthyResults, 10)

  if (!fs.existsSync(`${ROOT_DIR}/public/api`)) {
    fs.mkdirSync(`${ROOT_DIR}/public/api`)
  }
  if (!fs.existsSync(`${ROOT_DIR}/public/api/list`)) {
    fs.mkdirSync(`${ROOT_DIR}/public/api/list`)
  }

  /**
   * Generate API status page
   */
  fs.writeFile(
    `${ROOT_DIR}/public/${apiPath}/status.json`,
    JSON.stringify({
      status: 'success',
      code: 201,
      data: {
        time: Date.now(),
        list: {
          length: chunks.length,
        },
      },
    }),
    fshandler,
  )

  /**
   * Generate API listing pages
   */
  _.each(chunks, (chunk, i) => {
    const out: {status: string, code: number, data: IHentai[]} = {
      status: 'success',
      code: 201,
      data: [],
    }
    _.each(chunk, node => {
      if (node) {
        out.data.push(node.data.raw)
      }
    })
    fs.writeFile(`${ROOT_DIR}/public/${apiPath}/list/${i + 1}.json`, JSON.stringify(out), fshandler)
  })
}
