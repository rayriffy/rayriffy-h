import { CreatePagesArgs } from 'gatsby'
import path from 'path'

import { filterTag } from '../functions'

import { AllHentai, AllTag } from '../@types'

export type TagListingQuery = AllHentai & AllTag

export const tagListing = async ({ actions, graphql }: CreatePagesArgs) => {
  const { createPage } = actions

  const gqlFetch = await graphql<TagListingQuery>(`
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

  const emptyEdge = {
    edges: [],
  }

  const { data = { allTag: emptyEdge, allHentai: emptyEdge } } = gqlFetch
  const { allTag, allHentai } = data

  const tagStack = allTag.edges.map(edge => edge.node)
  const medias = allHentai.edges.map(edge => edge.node.raw)

  return tagStack.map(tag => {
    // Find all possible tags
    const nodes = filterTag(medias, tag.name)

    return createPage({
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
