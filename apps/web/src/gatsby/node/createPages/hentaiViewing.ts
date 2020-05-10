import { CreatePagesArgs } from 'gatsby'
import path from 'path'

import { AllHentai } from '../@types'

export type HentaiViewingQuery = AllHentai

export const hentaiViewing = async ({ actions, graphql }: CreatePagesArgs) => {
  const { createPage } = actions

  const gqlFetch = await graphql<HentaiViewingQuery>(`
    query HentaiViewingQuery {
      allHentai {
        edges {
          node {
            exclude
            raw {
              id
              images {
                cover {
                  h
                  t
                  w
                }
                pages {
                  h
                  t
                  w
                }
              }
              title {
                pretty
                japanese
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

  const tranformedData = gqlFetch.data
    ? gqlFetch.data.allHentai.edges.map(edge => edge.node)
    : []

  /**
   * Create gallery pages
   */
  tranformedData.map(node => {
    return createPage({
      path: `/r/${node.raw.id}`,
      component: path.resolve(
        `./src/templates/hentai/viewing/components/index.tsx`
      ),
      context: {
        raw: node,
      },
    })
  })
}
