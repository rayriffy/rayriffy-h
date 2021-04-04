/* eslint-disable @typescript-eslint/no-var-requires */
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')

const { nanoid } = require('nanoid')

const withPlugins = require('next-compose-plugins')

const withWorkers = require('@zeit/next-workers')
const withOffline = require('next-offline')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const withPreact = require('next-plugin-preact')

dayjs.extend(utc)
dayjs.extend(timezone)

const generatedId = nanoid()

module.exports = withPlugins(
  [[withOffline], [withWorkers], [withPreact], [withBundleAnalyzer]],
  {
    target: 'serverless',
    future: {
      webpack5: true
    },
    env: {
      buildId: generatedId,
      buildNumber: dayjs.tz(dayjs(), 'Asia/Bangkok').format('YYYYMMDD.HH'),
    },
    serverRuntimeConfig: {
      buildId: generatedId,
    },
    images: {
      domains: ['i.nhentai.net', 't.nhentai.net'],
    },
    generateBuildId: () => generatedId,
    experimental: {
      optimizeImages: true,
      scrollRestoration: true,
    },
    rewrites: async () => {
      return [
        {
          source: '/sw.js',
          destination: '/_next/static/sw.js',
        },
      ]
    },
    redirects: async () => {
      return [
        {
          source: '/public/:slug*',
          destination: '/:slug*',
          permanent: true,
        },
      ]
    },
    dontAutoRegisterSw: true,
    workboxOpts: {
      swDest: process.env.NEXT_EXPORT ? 'sw.js' : 'static/sw.js',
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
          urlPattern: /\/_next\/image\?url/i,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'next-image-assets',
          },
        },
        {
          urlPattern: /\/_next\/data\/[A-Za-z0-9_-]{21}\/g\/\d*.json/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'next-galleries',
          },
        },
        {
          urlPattern: /\/_next\/data\/[A-Za-z0-9_-]{21}\/listing(\/p\/\d)?.json/i,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'next-listing',
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
  }
)
