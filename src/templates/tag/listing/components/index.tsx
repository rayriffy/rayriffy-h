import _ from 'lodash'
import React, { useContext, useEffect } from 'react'

import { Box, Card, Flex, Text } from 'rebass'
import styled from 'styled-components'

import Divider from '../../../../core/components/divider'
import TransparentLink from '../../../../core/components/transparentLink'

import { Subtitle } from '../../../../app/context'

import { IProps } from '../@types/IProps'

const CoverCard = styled(Card)`
  border-radius: 8px;

  border: 1px solid #e8e8e8;
`

const TagListingComponent: React.FC<IProps> = props => {
  const {prefix, raw, subtitle} = props.pageContext

  const [, setSubtitle] = useContext(Subtitle)

  const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

  const processedTags = _.sortBy(raw.map(o => ({id: o.id, name: o.name})), o => o.name)

  useEffect(() => {
    if (setSubtitle) {
      setSubtitle(`${subtitle}`)
    }
  }, [])

  return (
    <Box pt={1}>
      <Flex justifyContent={`center`}>
        <Box width={[22 / 24, 18 / 24, 14 / 24, 10 / 24]}>
        {alphabet.map(text => {
          const filteredTags = _.filter(processedTags, o => _.startsWith(o.name, text))

          if (!_.isEmpty(filteredTags)) {
            return (
              <Box py={3} key={`tag-${prefix}-${text}`}>
                <CoverCard backgroundColor={`white`} p={3}>
                  <Box p={2}>
                    <Text fontSize={26} fontWeight={600}>{text.toUpperCase()}</Text>
                  </Box>
                  <Box p={2}>
                    {filteredTags.map((tag, i) => {
                      return (
                        <Box key={`tag-${prefix}-${text}-${tag.id}`}>
                          {i !== 0 ? <Divider /> : null}
                          <Box py={3}>
                            <TransparentLink to={`/${prefix}/${tag.id}`}>
                              <Text fontSize={14} color={`#3784f7`}>{tag.name}</Text>
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
    </Box>
  )
}

export default TagListingComponent
