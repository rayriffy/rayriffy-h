const { chunk } = require('lodash')
const path = require('path')

const { filterTag } = require('../functions/filterTag')
const { itemsPerPage } = require('../constants/itemsPerPage')

exports.tagViewing = async ({ actions, graphql }) => {
  const { createPage } = actions

  const gqlFetch = await graphql(`
    query TagViewingQuery {
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

  tagStack.map(tagType => {
    const nodes = filterTag(medias, tagType.name)

    nodes.map(async tag => {
      const gqlFetch = await graphql(`
      query TagViewingSubQuery {
        allHentai (filter: {raw: {tags: {elemMatch: {id: {eq: ${tag.id}}}}}}) {
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

      const hentaiByTag = gqlFetch.data.allHentai.edges.map(
        edge => edge.node.raw
      )
      const hentaiByTagChunks = chunk(hentaiByTag, itemsPerPage)

      hentaiByTagChunks.map((chunk, i) => {
        createPage({
          path:
            i === 0
              ? `/${tagType.prefix}/${tag.id}`
              : `${tagType.prefix}/${tag.id}/p/${i + 1}`,
          component: path.resolve(
            `./src/templates/tag/viewing/components/index.tsx`
          ),
          context: {
            subtitle: `${tagType.name}/${tag.name}`,
            raw: chunk,
            page: {
              current: i + 1,
              max: hentaiByTagChunks.length,
            },
            prefix: tagType.prefix,
            tag: tag,
          },
        })
      })
    })
  })
}
