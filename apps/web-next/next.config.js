/* eslint-disable @typescript-eslint/no-var-requires */
const moment = require('moment-timezone')

const withPlugins = require('next-compose-plugins')

const withWorkers = require('@zeit/next-workers')
const withPrefresh = require('@prefresh/next')
const withOffline = require('next-offline')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

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
    [
      withOffline,
      {
        dontAutoRegisterSw: true,
        transformManifest: manifest => ['/'].concat(manifest),
        workboxOpts: {
          swDest: './service-worker.js',
          runtimeCaching: [
            // if you are customizing your runtime cache rules, please note that the
            // first item in the runtime cache configuration array MUST be "start-url"
            {
              // MUST be the same as "start_url" in manifest.json
              urlPattern: '/',
              // use NetworkFirst or NetworkOnly if you redirect un-authenticated user to login page
              // use StaleWhileRevalidate if you want to prompt user to reload when new version available
              handler: 'NetworkFirst',
              options: {
                // don't change cache name
                cacheName: 'start-url',
              },
            },
            {
              urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts',
              },
            },
            {
              urlPattern: /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'static-font-assets',
              },
            },
            {
              urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'static-image-assets',
              },
            },
            {
              urlPattern: /\/_next\/image\?url/i,
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'next-image-assets',
              },
            },
            {
              urlPattern: /\.(?:js)$/i,
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'static-js-assets',
              },
            },
            {
              urlPattern: /\.(?:css|less)$/i,
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'static-style-assets',
              },
            },
            {
              urlPattern: /\.(?:json|xml|csv)$/i,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'static-data-assets',
              },
            },
            {
              urlPattern: /^https?:\/\/h\.api\.rayriffy\.com/i,
              handler: 'NetworkFirst',
              method: 'GET',
              options: {
                cacheName: 'api',
              },
            },
            {
              urlPattern: /^https?:\/\/h\.api\.rayriffy\.com/i,
              handler: 'NetworkFirst',
              method: 'GET',
              options: {
                cacheName: 'api',
              },
            },
            {
              urlPattern: /.*/i,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'others',
                expiration: {
                  maxEntries: 32,
                  maxAgeSeconds: 24 * 60 * 60, // 24 hours
                },
                networkTimeoutSeconds: 10,
              },
            },
          ],
        },
      },
    ],
    [withWorkers],
    [withBundleAnalyzer],
  ],
  {
    target: 'serverless',
    analyticsId: 'BzLafBo4gAyYPBzwTZDHBMipDaj',
    env: {
      buildNumber: moment().tz('Asia/Bangkok').format('YYYYMMDD.HH'),
    },
    images: {
      domains: ['i.nhentai.net', 't.nhentai.net'],
    },
    experimental: {
      modern: true,
      optimizeImages: true,
      scrollRestoration: true,
    },
    async rewrites() {
      return [
        {
          source: '/service-worker.js',
          destination: '/_next/service-worker.js',
        },
      ]
    },
  }
)
