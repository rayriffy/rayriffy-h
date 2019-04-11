const _ = require('lodash')
const axios = require('axios')
const Promise = require('bluebird')
const fs = require('fs')
const path = require('path')
const {createFilePath} = require('gatsby-source-filesystem')
const {TaskQueue} = require('cwait')

const MAX_SIMULTANEOUS_DOWNLOADS = 3

exports.createPages = ({graphql, actions}) => {
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
          }
        `,
      )
        .then(async result => {
          if (result.errors) {
            console.log(result.errors)
            reject(result.errors)
          }

          const getRawData = async id => {
            try {
              let isCacheFound = false
              let cacheRes
              // Read file from cache
              if (fs.existsSync('.tmp/crawler.json')) {
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
              console.log(`cannot process ${id} with code ${err.code}`)
              return {
                status: 'failure',
                data: {
                  id: id,
                },
              }
            }
          }

          const queue = new TaskQueue(Promise, MAX_SIMULTANEOUS_DOWNLOADS)

          const res = await Promise.all(
            result.data.allDataJson.edges.map(queue.wrap(async edge => await getRawData(edge.node.nh_id))),
          )

          return res
        })
        .then(result => {
          const healthyResults = _.filter(result, o => o.status === 'success')
          const tagStack = {
            artist: {prefix: 'a', name: 'artist', color: 'magenta'},
            category: {prefix: 'ca', name: 'category', color: 'purple'},
            character: {prefix: 'c', name: 'character', color: 'volcano'},
            group: {prefix: 'g', name: 'group', color: 'cyan'},
            language: {prefix: 'l', name: 'language', color: 'green'},
            parody: {prefix: 'p', name: 'parody', color: 'orange'},
            tag: {prefix: 't', name: 'tag', color: 'blue'},
          }

          // Create list page
          createPage({
            path: `listing`,
            component: path.resolve('./src/templates/listing.js'),
            context: {
              subtitle: `listing`,
              raw: healthyResults.reverse(),
              tagStack,
            },
          })

          // Create each post
          const postPrefix = 'r'
          _.each(healthyResults, node => {
            createPage({
              path: `${postPrefix}/${node.data.id}`,
              component: path.resolve('./src/templates/post.js'),
              context: {
                id: node.data.id,
                raw: node.data.raw,
                tagStack,
              },
            })
          })

          // Process for each category
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

          const createSlugPages = (pathPrefix, nodes, name) => {
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

          _.each(Object.keys(tagStack), key => {
            const nodes = tagFilter(healthyResults, key)
            // Listing
            createPage({
              path: `${tagStack[key].prefix}`,
              component: path.resolve('./src/templates/tag.js'),
              context: {
                prefix: tagStack[key].prefix,
                subtitle: `${tagStack[key].name}`,
                raw: nodes,
                tagStack,
              },
            })
            // All pages
            createSlugPages(tagStack[key].prefix, nodes, key)
          })

          // Put into cache
          fs.writeFile(`.tmp/crawler.json`, JSON.stringify(healthyResults), function(err) {
            if (err) {
              console.log(err)
              reject(err)
            }
          })

          // Create own static api
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

          // API Status
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

          // API Listing
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

exports.onCreateNode = ({node, actions, getNode}) => {
  const {createNodeField} = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({node, getNode})
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
