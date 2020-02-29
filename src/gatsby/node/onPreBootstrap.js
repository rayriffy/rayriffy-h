const fetch = require('isomorphic-unfetch')

const PREFETCH_GIST =
  'https://gist.githubusercontent.com/rayriffy/c19a9e4671f4bc69d05831befb205975/raw/4549e538ec8db8f30f4c37d5b73189a4f5ee4d59/cache.json'

exports.onPreBootstrap = async ({ reporter, cache }) => {
  // Download file from cache if cache does not exist
  const cacheData = await cache.get('rayriffy-h-hentai-cache')

  if (cacheData === undefined) {
    reporter.info(`Downloading prefetched data from GitHub Gist`)
    const gistCache = await fetch(PREFETCH_GIST).then(raw => raw.json())

    await cache.set(`rayriffy-h-hentai-cache`, JSON.stringify(gistCache))
    reporter.info(`Downloaded!`)
  } else {
    reporter.info(`Found cache! Skipping prefetch stage`)
  }
}
