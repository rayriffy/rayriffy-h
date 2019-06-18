const _ = require('lodash')
const axios = require('axios')
const Promise = require('bluebird')
const fs = require('fs')
const path = require('path')
const {TaskQueue} = require('cwait')

const MAX_SIMULTANEOUS_DOWNLOADS = 3
const PREFETCH_GIST = 'https://gist.githubusercontent.com/rayriffy/09554279046d2fda29c125e0a16dc695/raw/crawler.json'

exports.createPages = ({graphql, actions, reporter}) => {
  const {createPage} = actions

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allDataJson {
              edges {
                node {
                  nh_id
                }
              }
            }
            allTagJson {
              edges {
                node {
                  prefix
                  name
                }
              }
            }
          }
        `,
      )
        .then(async result => {
          if (result.errors) {
            console.log(result.errors)
            reject(result.errors)
          }

          /**
           * Functions for query data from NHentai API
           * @param {int} id Gallery ID
           */
          const getRawData = async id => {
            try {
              let isCacheFound = false
              let cacheRes
              // Read file from cache
              if (fs.existsSync('.tmp/crawler.json')) {
                reporter.info(`Downloading prefetched data from GitHub Gist`)
                const reader = fs.readFileSync('.tmp/crawler.json', 'utf8')
                const objects = JSON.parse(reader)

                _.each(objects, object => {
                  if (object.data.id === id && object.status === 'success') {
                    isCacheFound = true
                    cacheRes = object
                  }
                })
              }

              if (isCacheFound) {
                return cacheRes
              } else {
                // Using reverse proxy server to avoid CORS issue
                const out = await axios.get(`https://nh-express-git-master.rayriffy.now.sh/api/gallery/${id}`)
                return {
                  status: 'success',
                  data: {
                    id: id,
                    raw: out.data,
                  },
                }
              }
            } catch (err) {
              reporter.warn(`cannot process ${id} with code ${err.code}`)
              return {
                status: 'failure',
                data: {
                  id: id,
                },
              }
            }
          }

          // Download file from cache if cache does not exist
          if (!fs.existsSync('.tmp/crawler.json')) {
            console.log('[info] Downloading prefetch cache from Gist...')
            const gistCache = await axios.get(PREFETCH_GIST)

            await fs.writeFile(`.tmp/crawler.json`, JSON.stringify(gistCache.data), function(err) {
              if (err) {
                console.log(err)
                reject(err)
              }
            })
          }

          // Begin to fetch data
          const queue = new TaskQueue(Promise, MAX_SIMULTANEOUS_DOWNLOADS)
          const res = {}
          res.tags = result.data.allTagJson
          res.data = await Promise.all(
            result.data.allDataJson.edges.map(queue.wrap(async edge => await getRawData(edge.node.nh_id))),
          )

          return res
        })
        .then(result => {
          /**
           * Filter errors and assign contants
           */
          const healthyResults = _.filter(result.data, o => o.status === 'success')
          const tagStack = result.tags.edges

          /**
           * Create listing page
           */
          createPage({
            path: `listing`,
            component: path.resolve('./src/templates/listing.js'),
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
              component: path.resolve('./src/templates/post.js'),
              context: {
                id: node.data.id,
                raw: node.data.raw,
              },
            })
          })

          /**
           * Filter only tags object with specified types
           * @param {object} nodes  healthyTags
           * @param {string} type   Tag type
           */
          const tagFilter = (nodes, type) => {
            const res = []
            _.each(nodes, node => {
              _.each(node.data.raw.tags, tag => {
                if (tag.type === type) {
                  if (_.isEmpty(_.filter(res, node => node.id === tag.id))) {
                    res.push(tag)
                  }
                }
              })
            })
            return res
          }

          /**
           * Create listing pages for each tags
           * @param {string} pathPrefix   Tag path prefix
           * @param {object} nodes  Filtered tag object
           * @param {string} name        Tag name
           */
          const createSlugPages = (pathPrefix, name, nodes) => {
            _.each(nodes, tag => {
              const qualifiedResults = []
              _.each(healthyResults, node => {
                if (!_.isEmpty(_.filter(node.data.raw.tags, {id: tag.id}))) qualifiedResults.push(node)
              })
              createPage({
                path: `${pathPrefix}/${tag.id}`,
                component: path.resolve('./src/templates/listing.js'),
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
          _.each(tagStack, edge => {
            const nodes = tagFilter(healthyResults, edge.node.name)
            createSlugPages(edge.node.prefix, edge.node.name, nodes)
            createPage({
              path: `${edge.node.prefix}`,
              component: path.resolve('./src/templates/tag.js'),
              context: {
                prefix: edge.node.prefix,
                subtitle: `${edge.node.name}`,
                raw: nodes,
              },
            })
          })

          /**
           * Put all healthy results into cache
           */
          fs.writeFile(`.tmp/crawler.json`, JSON.stringify(healthyResults), function(err) {
            if (err) {
              console.log(err)
              reject(err)
            }
          })

          /**
           * Preparing to generate API
           */
          const apiPath = 'api'
          const chunks = _.chunk(healthyResults, 10)

          if (!fs.existsSync('./public/api')) {
            fs.mkdirSync('./public/api', function(err) {
              if (err) {
                console.log(err)
                reject(err)
              }
            })
          }
          if (!fs.existsSync('./public/api/list')) {
            fs.mkdirSync('./public/api/list', function(err) {
              if (err) {
                console.log(err)
                reject(err)
              }
            })
          }

          /**
           * Generate API status page
           */
          fs.writeFile(
            `public/${apiPath}/status.json`,
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
            function(err) {
              if (err) {
                console.log(err)
                reject(err)
              }
            },
          )

          /**
           * Generate API listing pages
           */
          _.each(chunks, (chunk, i) => {
            let out = {
              status: 'success',
              code: 201,
              data: [],
            }
            _.each(chunk, node => {
              out.data.push(node.data.raw)
            })
            fs.writeFile(`public/${apiPath}/list/${i + 1}.json`, JSON.stringify(out), function(err) {
              if (err) {
                console.log(err)
                reject(err)
              }
            })
          })
        }),
    )
  })
}

/**
 * Generate page from dynamic URLs that match RegExp
 */
exports.onCreatePage = async ({page, actions}) => {
  const {createPage} = actions

  if (page.path.match(/^\/g/)) {
    page.matchPath = '/g/*'
    createPage(page)
  }
}

exports.onCreateBabelConfig = ({actions}) => {
  actions.setBabelPlugin({
    name: 'babel-plugin-import',
    options: {
      libraryName: 'antd',
      style: true,
    },
  })
}
