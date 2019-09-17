import _ from 'lodash'
import React from 'react'

import { Link } from 'gatsby'

import { Box, Text } from 'rebass'
import styled from 'styled-components'

import { IProps } from '../@types/IProps'

const TransparentLink = styled(Link)`
  text-decoration: none;
`

const TagListingComponent: React.FC<IProps> = props => {
  const {prefix, raw} = props.pageContext

  const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

  const processedTags = _.sortBy(raw.map(o => ({id: o.id, name: o.name})), o => o.name)

  return (
    <Box pt={1}>
      {alphabet.map(text => {
        const filteredTags = _.filter(processedTags, o => _.startsWith(o.name, text))

        if (!_.isEmpty(filteredTags)) {
          return (
            <Box py={3} key={`tag-${prefix}-${text}`}>
              <Text fontSize={26} fontWeight={600}>{text.toUpperCase()}</Text>
              {filteredTags.map(tag => {
                return (
                  <Box key={`tag-${prefix}-${text}-${tag.id}`}>
                    <TransparentLink to={`/${prefix}/${tag.id}`}>
                      <Text>{tag.name}</Text>
                    </TransparentLink>
                  </Box>
                )
              })}
            </Box>
          )
        } else {
          return null
        }
      })}
    </Box>
  )
}

export default TagListingComponent
