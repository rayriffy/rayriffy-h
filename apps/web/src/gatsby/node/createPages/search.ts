import { CreatePagesArgs } from 'gatsby'
import path from 'path'

import { AllHentai } from '../@types'
import { itemsPerPage } from '../constants'

export type ISearchQuery = AllHentai

export const search = async ({ actions, graphql }: CreatePagesArgs) => {
  const { createPage } = actions

  const gqlFetch = await graphql<ISearchQuery>(`
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

  const transformedNode = gqlFetch.data
    ? gqlFetch.data.allHentai.edges.map(edge => edge.node.raw)
    : []

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
