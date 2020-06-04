import { GatsbyConfig } from 'gatsby'

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'Riffy H',
    author: 'Phumrapee Limpianchop',
    description: 'NSFW',
    siteUrl: 'https://h.rayriffy.com',
  },
  pathPrefix: '/',
  plugins: [
    `gatsby-plugin-postcss`,
    // `gatsby-plugin-preact`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/../contents/database`,
        name: `database`,
        ignore: [`**/.*`],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/../pages`,
        name: 'pages',
        ignore: [`**/.*`],
      },
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/g/*`, `/p/*`] },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Riffy H`,
        short_name: `Riffy H`,
        start_url: `/`,
        lang: `en`,
        background_color: `#2d3748`,
        theme_color: `#1a202c`,
        display: 'standalone',
        icon: `${__dirname}/../../static/img/favicon.png`,
        icon_options: {
          purpose: `any maskable`,
        },
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true,
        allExtensions: true,
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        runtimeCaching: [
          {
            urlPattern: /(\.js$|\.css$|static\/)/,
            handler: `cacheFirst`,
          },
          {
            urlPattern: /^https?:.*\page-data\/.*\/page-data\.json/,
            handler: `networkFirst`,
          },
          {
            urlPattern: /^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/,
            handler: `staleWhileRevalidate`,
          },
          {
            urlPattern: /^https?:\/\/fonts\.googleapis\.com\/css/,
            handler: `staleWhileRevalidate`,
          },
          {
            urlPattern: /^https?:\/\/h\.api\.rayriffy\.com\/v1\/gallery/,
            handler: `staleWhileRevalidate`,
          },
        ],
        skipWaiting: true,
        clientsClaim: true,
      },
    },
  ],
}

export default config
