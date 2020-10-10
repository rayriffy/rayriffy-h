import { CreatePagesArgs } from 'gatsby'
import { chunk } from 'lodash'
import path from 'path'

import { itemsPerPage } from '../constants'
import { codes } from '../../../contents/database/codes'

import { AllHentai } from '../@types/AllHentai'

export type HentaiListingQuery = AllHentai

export const hentaiListing = async ({ actions, graphql }: CreatePagesArgs) => {
  const { createPage } = actions

  const gqlFetch = await graphql<HentaiListingQuery>(`
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
   * Sort into correct order by referencing from database
   */
  const sortedData = codes
    .map(code => {
      const targetCode = typeof code === 'number' ? code : code.code
      return transformedData.find(
        data => Number(data.id) === Number(targetCode)
      )
    })
    .filter(o => o !== undefined)
    .reverse()

  /**
   * Create listing page
   */
  const hentaiListingChunks = chunk(sortedData, itemsPerPage)

  return hentaiListingChunks.map((chunk, i) => {
    return createPage({
      path: i === 0 ? `/listing` : `/listing/p/${i + 1}`,
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
