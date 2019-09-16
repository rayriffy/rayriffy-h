import React from 'react'

import { Link } from 'gatsby'

import { Box, Text } from 'rebass'
import styled from 'styled-components'

import { ISlugProps } from '../@types/ISlugProps'

interface IBorderedSlug {
  border: string
}

const BorderedSlug = styled(Box)<IBorderedSlug>`
  border-radius: 4px;
  border: 1px solid #d9d9d9;

  border-color: ${props => props.border};
`

const TransparentLink = styled(Link)`
  text-decoration: none;
`

const SlugComponent: React.FC<ISlugProps> = props => {
  const { border = '#d9d9d9', background = '#fafafa', text = 'rgba(0, 0, 0, 0.65)', link, children } = props
  return (
    <Box p={'2px'}>
      <BorderedSlug border={border} backgroundColor={background}>
        {link ? (
          <TransparentLink to={link}>
            <Text color={text} fontSize={12} px={1} py={`2px`}>{children}</Text>
          </TransparentLink>
        ) : (
          <Text color={text} fontSize={12} px={1} py={`2px`}>{children}</Text>
        )}
      </BorderedSlug>
    </Box>
  )
}

export default SlugComponent
