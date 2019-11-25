import React from 'react'

import { Badge, Box } from '@chakra-ui/core'

import TransparentLink from '../../core/components/transparentLink'

import { ISlugProps } from '../@types/ISlugProps'

const SlugComponent: React.FC<ISlugProps> = props => {
  const { color, link, title } = props

  return (
    <React.Fragment>
      {link ? (
        <Box px={1}>
          <TransparentLink to={link}>
            <Badge fontSize={11} variant='outline' variantColor={color}>
              {title}
            </Badge>
          </TransparentLink>
        </Box>
      ) : (
        <Box px={1}>
          <Badge fontSize={11} variant='outline' variantColor={color}>
            {title}
          </Badge>
        </Box>
      )}
    </React.Fragment>
  )
}

export default SlugComponent
