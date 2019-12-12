import React from 'react'

import Context from './src/store'

export const wrapRootElement = ({ element }) => {
  return (
    <React.StrictMode>
      <Context>{element}</Context>
    </React.StrictMode>
  )
}
