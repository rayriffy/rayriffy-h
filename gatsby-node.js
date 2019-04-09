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
              const out = await axios.get(`https://nh-express-git-master.rayriffy.now.sh/api/gallery/${id}`)
              return {
                status: 'success',
                data: {
                  id: id,
                  raw: out.data,
                },
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
          const pathPrefix = 'c/'

          // Create list page
          createPage({
            path: `listing`,
            component: path.resolve('./src/templates/listing.js'),
            context: {
              raw: result.reverse(),
            },
          })

          // Create each post
          _.each(result, node => {
            if (node.status === 'success') {
              createPage({
                path: `${pathPrefix}${node.data.id}`,
                component: path.resolve('./src/templates/post.js'),
                context: {
                  id: node.data.id,
                  raw: node.data.raw,
                },
              })
            }
          })

          // Create own static api
          const apiPath = 'api'
          const healthyResults = _.filter(result, o => o.status === 'success')
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
