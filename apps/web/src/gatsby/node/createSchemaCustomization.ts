import { GatsbyNode } from 'gatsby'

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = async ({
  actions,
}) => {
  const { createTypes } = actions

  const typeDefs = `
    type Tag implements Node {
      color: String!
      name: String!
      prefix: String!
    }

    type Hentai implements Node {
      hentai_id: Int!
      exclude: [Int!]!
      raw: HentaiData!
    }

    type HentaiData {
      id: Int!
      media_id: String!
      title: HentaiTitle!
      images: HentaiImages!
      tags: [HentaiTag!]!
    }

    type HentaiTitle {
      english: String!
      japanese: String!
      pretty: String!
    }

    type HentaiTag {
      id: Int!
      type: String!
      name: String!
    }

    type HentaiImages {
      cover: HentaiImage!
      pages: [HentaiImage!]!
    }

    type HentaiImage {
      w: Int!
      h: Int!
      t: String!
    }
  `
  createTypes(typeDefs)
}
