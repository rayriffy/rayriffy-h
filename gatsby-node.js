const { createPages } = require('./src/gatsby/node/createPages')
const {
  onCreateWebpackConfig,
} = require('./src/gatsby/node/onCreateWebpackConfig')
const { onPostBootstrap } = require('./src/gatsby/node/onPostBootstrap')
const { onPreBootstrap } = require('./src/gatsby/node/onPreBootstrap')
const { sourceNodes } = require('./src/gatsby/node/sourceNodes')

exports.createPages = createPages
exports.onCreateWebpackConfig = onCreateWebpackConfig
exports.onPostBootstrap = onPostBootstrap
exports.onPreBootstrap = onPreBootstrap
exports.sourceNodes = sourceNodes
