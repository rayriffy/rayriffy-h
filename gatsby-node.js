const { createPages } = require('./src/gatsby/node/createPages')
const { onCreateWebpackConfig } = require('./src/gatsby/node/onCreateWebpackConfig')
const { onPostBootstrap } = require('./src/gatsby/node/onPostBootstrap')

exports.createPages = createPages
exports.onCreateWebpackConfig = onCreateWebpackConfig
exports.onPostBootstrap = onPostBootstrap
