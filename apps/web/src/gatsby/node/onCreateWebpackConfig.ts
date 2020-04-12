import { GatsbyNode } from 'gatsby'

import TSPathPligin from 'tsconfig-paths-webpack-plugin'

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  actions,
  getConfig,
}) => {
  const { replaceWebpackConfig } = actions
  const config = getConfig()

  if (config.resolve.plugins) {
    config.resolve.plugins.push(new TSPathPligin())
  } else {
    config.resolve.plugins = [new TSPathPligin()]
  }

  config.module.rules.push({
    test: /\.worker\.js$/,
    use: { loader: 'workerize-loader' },
  })

  config.output.globalObject = 'this'

  replaceWebpackConfig(config)
}
