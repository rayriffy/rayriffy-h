import { GatsbyNode } from 'gatsby'

export const onCreateBabelConfig: GatsbyNode["onCreateBabelConfig"] = ({ actions }) => {
  const { setBabelPreset, setBabelPlugin } = actions

  const plugins = [
    "object-to-json-parse",
    "optimize-react",
    "loop-optimizer",
    "transform-remove-console"
  ]

  plugins.map(plugin => {
    setBabelPlugin({
      name: require.resolve(`babel-plugin-${plugin}`),
      options: {},
    })
  })
  
  setBabelPreset({
    name: require.resolve(`babel-preset-gatsby`),
    options: {
      targets: {
        browsers: [">0.25%", "not dead"]
      }
    },
  })
}
