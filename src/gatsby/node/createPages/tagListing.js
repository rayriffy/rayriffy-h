const path = require('path')

const { filterTag } = require('../functions/filterTag')

exports.tagListing = async ({ actions, graphql }) => {
  const { createPage } = actions

  const gqlFetch = await graphql(`
    query TagListingQuery {
      allTag {
        edges {
          node {
            name
            prefix
          }
        }
      }
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

  const { allTag, allHentai } = gqlFetch.data

  const tagStack = allTag.edges.map(edge => edge.node)
  const medias = allHentai.edges.map(edge => edge.node.raw)

  tagStack.map(tag => {
    // Find all possible tags
    const nodes = filterTag(medias, tag.name)

    createPage({
      path: `/${tag.prefix}`,
      component: path.resolve(
        `./src/templates/tag/listing/components/index.tsx`
      ),
      context: {
        prefix: tag.prefix,
        subtitle: `${tag.name}`,
        raw: nodes,
      },
    })
  })
}
