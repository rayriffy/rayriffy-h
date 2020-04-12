import React from 'react'

import { Badge, Box } from '@chakra-ui/core'

import { TransparentLink } from './'

import { SlugProps } from '../@types'

const Component: React.FC<SlugProps> = props => {
  const { color, link, title } = props

  const badge: React.ReactNode = (
    <Badge fontSize={11} variant='outline' variantColor={color}>
      {title}
    </Badge>
  )

  return (
    <Box px={1}>
      {link ? (
        <TransparentLink to={link} aria-label={title}>
          {badge}
        </TransparentLink>
      ) : (
        badge
      )}
    </Box>
  )
}

export const Slug = React.memo(Component)
