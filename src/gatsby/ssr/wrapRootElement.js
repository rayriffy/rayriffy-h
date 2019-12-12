import React from 'react'

import Context from '../../store'

export const wrapRootElement = ({ element }) => {
  return (
    <React.StrictMode>
      <Context>{element}</Context>
    </React.StrictMode>
  )
}
