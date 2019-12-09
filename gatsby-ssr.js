import React from 'react'

import Context from './src/store'

import App from './src/app/components'

export const wrapPageElement = ({ element, props }) => {
  return <App {...props}>{element}</App>
}

export const wrapRootElement = ({ element }) => {
  return <Context>{element}</Context>
}
