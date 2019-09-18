module.exports = {
  siteMetadata: {
    title: 'Riffy H',
    author: 'Phumrapee Limpianchop',
    description: 'NSFW',
    siteUrl: 'https://h.rayriffy.com',
  },
  pathPrefix: '/',
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/contents/database`,
        name: `database`,
        ignore: [`**/.*`],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
        ignore: [`**/.*`],
      },
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/g/*`] },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Riffy H`,
        short_name: `Riffy H`,
        start_url: `/`,
        background_color: `#f5f5f5`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `static/img/LOGO-C-min.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-85367836-4`,
      },
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: `${__dirname}/src/utils/typography`,
        omitGoogleFont: true,
      },
    },
    `gatsby-plugin-netlify`,
    {
      resolve: 'gatsby-plugin-netlify-cache',
      options: {
        extraDirsToCache: ['.tmp'],
      },
    },
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true,
        allExtensions: true,
      },
    },
  ],
}
