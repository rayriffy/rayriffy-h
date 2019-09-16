import App from './src/app/components'

export const wrapPageElement = ({ element, props }) => {
  return <App {...props}>{element}</App>
}

export const onClientEntry = () => {
  if (process.env.NODE_ENV !== `production`) {
    require(`preact/debug`)
  }
}
