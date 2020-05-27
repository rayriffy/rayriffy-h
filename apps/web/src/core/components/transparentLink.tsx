import React from 'react'

import { Link } from 'gatsby'

import { TransparentLinkProps } from '../@types/TransparentLinkProps'

export const TransparentLink: React.FC<TransparentLinkProps> = props => (
  <Link className='no-underline' {...props} />
)
