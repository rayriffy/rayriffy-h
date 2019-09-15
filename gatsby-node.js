require('source-map-support').install()
require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'es2017',
  },
})

exports.createPages = require('./src/server/createPages').createPages
exports.onCreatePage = require('./src/server/onCreatePage').onCreatePage
exports.onCreateWebpackConfig = require('./src/server/onCreateWebpackConfig').onCreateWebpackConfig
