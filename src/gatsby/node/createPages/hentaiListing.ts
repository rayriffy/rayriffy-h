import { CreatePagesArgs } from 'gatsby'
import { chunk } from 'lodash'
import path from 'path'

import { itemsPerPage } from '../constants'

import { IAllHentai } from '../@types/IAllHentai'

export type IHentaiListingQuery = IAllHentai

export const hentaiListing = async ({ actions, graphql }: CreatePagesArgs) => {
  const { createPage } = actions

  const gqlFetch = await graphql<IHentaiListingQuery>(`
    query HentaiListingQuery {
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

  const transformedData = gqlFetch.data
    ? gqlFetch.data.allHentai.edges.map(edge => edge.node.raw)
    : []

  /**
   * Create listing page
   */
  const hentaiListingChunks = chunk(transformedData, itemsPerPage)

  hentaiListingChunks.map((chunk, i) => {
    createPage({
      path: i === 0 ? `/` : `/p/${i + 1}`,
      component: path.resolve(
        `./src/templates/hentai/listing/components/index.tsx`
      ),
      context: {
        subtitle: `listing`,
        raw: chunk,
        page: {
          current: i + 1,
          max: hentaiListingChunks.length,
        },
      },
    })
  })
}
