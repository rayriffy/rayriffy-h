import React from 'react'

import { GatsbyBrowser } from 'gatsby'

import { App } from '../../app/components'

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element,
  props,
}) => {
  return <App {...props}>{element}</App>
}
