/**
 * External libs
 */
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')
const { nanoid } = require('nanoid')

/**
 * Local imports
 */
const { runtimeCaching } = require('./runtimeCaching')

/**
 * NextJS plugins import
 */
const withPlugins = require('next-compose-plugins')
const withPWA = require('next-pwa')({
  disable: process.env.NODE_ENV === 'development',
  dest: 'public',
  register: false,
  skipWaiting: true,
  runtimeCaching,
  publicExcludes: ['!static/key/**/*', '!static/searchKey.opt'],
})
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

dayjs.extend(utc)
dayjs.extend(timezone)

const generatedId = nanoid()

module.exports = withPlugins([[withPWA], [withBundleAnalyzer]], {
  env: {
    buildId: generatedId,
    buildNumber: dayjs.tz(dayjs(), 'Asia/Bangkok').format('YYYYMMDD.HH'),
  },
  api: {
    responseLimit: '20mb',
  },
  serverRuntimeConfig: {
    buildId: generatedId,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['i.nhentai.net', 't.nhentai.net'],
  },
  generateBuildId: () => generatedId,
  experimental: {
    reactRoot: 'concurrent',
    polyfillsOptimization: true,
    scrollRestoration: true,
    // outputStandalone: true,
  },
  output: 'standalone',
})
