const _ = require('lodash')
const axios = require('axios')
const Promise = require('bluebird')
const path = require('path')
const {createFilePath} = require('gatsby-source-filesystem')
const {TaskQueue} = require('cwait')

const MAX_SIMULTANEOUS_DOWNLOADS = 5

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

          // const res = []
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

          // _.each(result.data.allDataJson.edges, edge => {
          //   res.push(getRawData(edge.node.nh_id))
          // })

          // await Promise.all(res)

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
            path: `main`,
            component: path.resolve('./src/templates/listing.js'),
            context: {
              raw: result,
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
