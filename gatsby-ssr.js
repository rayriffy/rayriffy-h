import React from 'react'

import App from './src/app/components'
import Context from './src/store'

export const wrapPageElement = ({ element, props }) => {
  return <App {...props}>{element}</App>
}

export const wrapRootElement = ({ element }) => {
  return (
    <React.StrictMode>
      <Context>{element}</Context>
    </React.StrictMode>
  )
}
