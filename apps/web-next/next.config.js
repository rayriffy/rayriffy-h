/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require('next-compose-plugins')

const withPrefresh = require('@prefresh/next')

const withPreact = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, { dev, isServer }) {
      // Move Preact into the framework chunk instead of duplicating in routes:
      const splitChunks = config.optimization && config.optimization.splitChunks
      if (splitChunks) {
        const cacheGroups = splitChunks.cacheGroups
        const test = /[\\/]node_modules[\\/](preact|preact-render-to-string|preact-context-provider)[\\/]/
        if (cacheGroups.framework) {
          cacheGroups.preact = Object.assign({}, cacheGroups.framework, {
            test,
          })
          // if you want to merge the 2 small commons+framework chunks:
          // cacheGroups.commons.name = 'framework';
        }
      }

      if (isServer) {
        // mark `preact` stuffs as external for server bundle to prevent duplicate copies of preact
        config.externals.push(
          /^(preact|preact-render-to-string|preact-context-provider)([\\/]|$)/
        )
      }

      // Install webpack aliases:
      const aliases = config.resolve.alias || (config.resolve.alias = {})
      aliases.react = aliases['react-dom'] = 'preact/compat'

      // Automatically inject Preact DevTools:
      if (dev && !isServer) {
        const entry = config.entry
        config.entry = () =>
          entry().then(entries => {
            entries['main.js'] = ['preact/debug'].concat(
              entries['main.js'] || []
            )
            return entries
          })
      }

      return config
    },
  })
}

module.exports = withPlugins(
  [
    ...(process.env.NODE_ENV === 'production'
      ? [[withPrefresh], [withPreact]]
      : []),
  ],
  {
    target: 'serverless',
    images: {
      domains: ['i.nhentai.net', 't.nhentai.net'],
    },
    experimental: {
      modern: true,
      polyfillsOptimization: true,
      optimizeFonts: true,
      optimizeImages: true,
    },
  }
)
