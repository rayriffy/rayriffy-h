import { GatsbyConfig } from 'gatsby'

import path from 'path'

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'Riffy H',
    author: 'Phumrapee Limpianchop',
    description: 'NSFW',
    siteUrl: 'https://h.rayriffy.com',
  },
  pathPrefix: '/',
  plugins: [
    // `gatsby-plugin-why-did-you-render`,
    `gatsby-plugin-postcss`,
    {
      resolve: require.resolve(`@nrwl/gatsby/plugins/nx-gatsby-ext-plugin`),
      options: {
        path: path.join(__dirname, '../../'),
      },
    },
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
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-85367836-6',
        head: false,
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        runtimeCaching: [
          {
            // Use cacheFirst since these don't need to be revalidated (same RegExp
            // and same reason as above)
            urlPattern: /(\.js$|\.css$|static\/)/,
            handler: `CacheFirst`,
          },
          {
            // page-data.json files are not content hashed
            urlPattern: /^https?:.*\page-data\/.*\/page-data\.json/,
            handler: `NetworkFirst`,
          },
          {
            // Add runtime caching of various other page resources
            urlPattern: /^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/,
            handler: `StaleWhileRevalidate`,
          },
          {
            // Google Fonts CSS (doesn't end in .css so we need to specify it)
            urlPattern: /^https?:\/\/fonts\.googleapis\.com\/css/,
            handler: `StaleWhileRevalidate`,
          },
          {
            urlPattern: /^https?:\/\/h\.api\.rayriffy\.com/,
            handler: `NetworkFirst`,
          },
        ],
        skipWaiting: true,
        clientsClaim: true,
      },
    },
  ],
}

export default config
