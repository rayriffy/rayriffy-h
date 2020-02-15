import React from 'react'

import { Helmet } from 'react-helmet'

import { isEmpty, upperFirst } from 'lodash-es'

import { Box, Divider, Flex, Text, useColorMode } from '@chakra-ui/core'
import styled from '@emotion/styled'

import BluredImage from '../bluredImage'
import { headingFontColor } from '../heading'
import Slug from '../slug'
import Collapse from './collapse'
import Share from './share'

import { tags as tagStack } from '../../../contents/database/tags'

import { filterTagByType } from '../../services/filterTagByType'

import { IReaderProps } from '../../@types/IReaderProps'

const CoverBox = styled(Box)`
  overflow: hidden;
`

const ReaderComponent: React.FC<IReaderProps> = props => {
  const { raw, internal = true } = props

  const { colorMode } = useColorMode()

  const hentai = raw.data.raw

  return (
    <Box py={2}>
      <Helmet title={hentai.title.pretty} />
      <Box py={2}>
        <Flex justifyContent='center'>
          <Box width={[22 / 24, 19 / 24, 16 / 24, 12 / 24]}>
            <Flex flexWrap='wrap'>
              <Box width={3 / 7} p={[2, 3]}>
                <CoverBox>
                  <BluredImage
                    height={hentai.images.cover.h}
                    alt={`Cover ${hentai.title.pretty}`}
                    src={`https://t.nhentai.net/galleries/${
                      hentai.media_id
                    }/cover.${hentai.images.cover.t === 'p' ? 'png' : 'jpg'}`}
                  />
                </CoverBox>
              </Box>
              <Box width={4 / 7} p={[2, 3]}>
                <Text
                  fontSize='2xl'
                  fontWeight={600}
                  color={colorMode ? headingFontColor[colorMode] : undefined}>
                  {hentai.title.pretty}
                </Text>
                <Box py={2}>
                  {tagStack.map((stack, i) => {
                    const res = filterTagByType(hentai.tags, stack.name)

                    if (!isEmpty(res)) {
                      return (
                        <Box key={`collapse-${hentai.id}-${stack.name}`}>
                          {i !== 0 ? <Divider /> : null}
                          <Box py={1}>
                            <Collapse
                              title={upperFirst(stack.name)}
                              defaultState={stack.name === 'tag'}>
                              <Flex flexWrap='wrap'>
                                {res.map(tag => {
                                  return (
                                    <Slug
                                      key={`slug-${hentai.id}-${stack.name}-${tag.id}`}
                                      color={stack.color}
                                      link={`/${stack.prefix}/${tag.id}`}
                                      title={tag.name}
                                    />
                                  )
                                })}
                              </Flex>
                            </Collapse>
                          </Box>
                        </Box>
                      )
                    } else {
                      return null
                    }
                  })}
                </Box>
                <Box py={2}>
                  <Share hentai={hentai} internal={internal} />
                </Box>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Box>
      <Box py={2}>
        <Flex justifyContent='center'>
          <Box width={['100%', 22 / 24, 16 / 24, 12 / 24]}>
            {hentai.images.pages.map((page, i) => {
              if (!raw.data.exclude.includes(i + 1)) {
                return (
                  <CoverBox key={`reader-${raw.data.id}-page-${i + 1}`}>
                    <BluredImage
                      height={page.h}
                      alt={`Page ${i + 1}`}
                      src={`https://i.nhentai.net/galleries/${
                        hentai.media_id
                      }/${i + 1}.${page.t === 'p' ? 'png' : 'jpg'}`}
                    />
                  </CoverBox>
                )
              } else {
                return null
              }
            })}
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}

export default React.memo(ReaderComponent)
