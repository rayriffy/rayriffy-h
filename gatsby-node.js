const { createPages } = require('./src/gatsby/node/createPages')
const {
  onCreateWebpackConfig,
} = require('./src/gatsby/node/onCreateWebpackConfig')
const { onPreBootstrap } = require('./src/gatsby/node/onPreBootstrap')
const { sourceNodes } = require('./src/gatsby/node/sourceNodes')

exports.createPages = createPages
exports.onCreateWebpackConfig = onCreateWebpackConfig
exports.onPreBootstrap = onPreBootstrap
exports.sourceNodes = sourceNodes
