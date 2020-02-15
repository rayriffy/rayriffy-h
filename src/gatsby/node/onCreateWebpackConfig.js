exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
  const { replaceWebpackConfig } = actions
  const config = getConfig()

  config.module.rules.push({
    test: /\.worker\.js$/,
    use: { loader: 'workerize-loader' },
  })

  config.output.globalObject = 'this'

  replaceWebpackConfig(config)
}
