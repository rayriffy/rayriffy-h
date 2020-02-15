import React, { useContext, useEffect } from 'react'

import { isEmpty, sortBy, startsWith } from 'lodash-es'

import { Box, Divider, Flex, Text, useColorMode } from '@chakra-ui/core'
import styled from '@emotion/styled'

import Heading from '../../../../core/components/heading'
import TransparentLink from '../../../../core/components/transparentLink'

import { Subtitle } from '../../../../store'

import { IProps } from '../@types/IProps'

const CoverCard = styled(Box)`
  border-radius: 8px;
  border: 1px solid #e8e8e8;
`

const TagListingComponent: React.FC<IProps> = props => {
  const { prefix, raw, subtitle } = props.pageContext

  const { colorMode } = useColorMode()

  const { 1: setSubtitle } = useContext(Subtitle)

  const alphabet = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ]

  const processedTags = sortBy(
    raw.map(o => ({ id: o.id, name: o.name })),
    o => o.name
  )

  useEffect(() => {
    setSubtitle(`${subtitle}`)
  }, [])

  return (
    <Flex justifyContent='center' pt={1}>
      <Box width={[22 / 24, 18 / 24, 14 / 24, 10 / 24]}>
        {alphabet.map(text => {
          const filteredTags = processedTags.filter(o =>
            startsWith(o.name, text)
          )

          if (!isEmpty(filteredTags)) {
            return (
              <Box py={3} key={`tag-${prefix}-${text}`}>
                <CoverCard
                  p={3}
                  bg={colorMode === 'dark' ? 'gray.700' : undefined}>
                  <Box p={2}>
                    <Heading size='xl'>{text.toUpperCase()}</Heading>
                  </Box>
                  <Box p={2}>
                    {filteredTags.map((tag, i) => {
                      return (
                        <Box key={`tag-${prefix}-${text}-${tag.id}`}>
                          {i !== 0 ? <Divider /> : null}
                          <Box py={3}>
                            <TransparentLink
                              to={`/${prefix}/${tag.id}`}
                              aria-label={tag.name}>
                              <Text fontSize='sm' color='blue.500'>
                                {tag.name}
                              </Text>
                            </TransparentLink>
                          </Box>
                        </Box>
                      )
                    })}
                  </Box>
                </CoverCard>
              </Box>
            )
          } else {
            return null
          }
        })}
      </Box>
    </Flex>
  )
}

export default TagListingComponent
