import React from 'react'

import { GatsbyBrowser } from 'gatsby'

import { Context } from '../../store'

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({
  element,
}) => {
  return <Context>{element}</Context>
}
