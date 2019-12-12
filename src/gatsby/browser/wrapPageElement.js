import React from 'react'

import App from '../../app/components'

export const wrapPageElement = ({ element, props }) => {
  return <App {...props}>{element}</App>
}
