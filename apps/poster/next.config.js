/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require('next-compose-plugins')

const withPreact = require('next-plugin-preact')

module.exports = withPlugins([[withPreact]], {
  target: 'serverless',
  experimental: {
    modern: true,
  },
})
