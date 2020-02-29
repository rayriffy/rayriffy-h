const path = require('path')

const { itemsPerPage } = require('../constants/itemsPerPage')

exports.search = async ({ actions, graphql }) => {
  const { createPage } = actions
  
  const gqlFetch = await graphql(`
    query SearchQuery {
      allHentai {
        edges {
          node {
            raw {
              id
              images {
                cover {
                  h
                  t
                  w
                }
              }
              title {
                english
                japanese
                pretty
              }
              media_id
              tags {
                type
                name
                id
              }
            }
          }
        }
      }
    }  
  `)
  
  const transformedNode = gqlFetch.data.allHentai.edges.map(edge => edge.node.raw)
  
  /**
   * Create search page
   */
  createPage({
    path: `/search`,
    component: path.resolve(`./src/templates/search/components/index.tsx`),
    context: {
      raw: transformedNode,
      skip: itemsPerPage,
    },
  })
}