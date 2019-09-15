require('source-map-support').install()
require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'es2017',
  },
})

exports.wrapPageElement = require('./src/server/wrapPageElement').wrapPageElement
exports.onClientEntry = require('./src/server/onClientEntry').onClientEntry
