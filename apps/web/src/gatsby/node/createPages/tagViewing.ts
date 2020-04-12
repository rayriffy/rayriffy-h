import { CreatePagesArgs } from 'gatsby'
import { chunk } from 'lodash'
import path from 'path'

import { itemsPerPage } from '../constants'
import { filterTag } from '../functions'

import { AllHentai, AllTag } from '../@types'

export type TagViewingQuery = AllHentai & AllTag
export type TagViewingSubQuery = AllHentai

export const tagViewing = async ({ actions, graphql }: CreatePagesArgs) => {
  const { createPage } = actions

  const gqlFetch = await graphql<TagViewingQuery>(`
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

  const emptyEdge = {
    edges: [],
  }

  const { data = { allTag: emptyEdge, allHentai: emptyEdge } } = gqlFetch
  const { allTag, allHentai } = data

  const tagStack = allTag.edges.map(edge => edge.node)
  const medias = allHentai.edges.map(edge => edge.node.raw)

  tagStack.map(tagType => {
    const nodes = filterTag(medias, tagType.name)

    return nodes.map(async tag => {
      const gqlFetch = await graphql<TagViewingSubQuery>(`
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

      const hentaiByTag = gqlFetch.data
        ? gqlFetch.data.allHentai.edges.map(edge => edge.node.raw)
        : []
      const hentaiByTagChunks = chunk(hentaiByTag, itemsPerPage)

      return hentaiByTagChunks.map((chunk, i) => {
        return createPage({
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
            tag,
          },
        })
      })
    })
  })
}
