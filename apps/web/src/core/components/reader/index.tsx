import React from 'react'

import { Helmet } from 'react-helmet'
import { trackWindowScroll, LazyComponentProps } from 'react-lazy-load-image-component'

import { isEmpty, upperFirst } from 'lodash-es'

import { Box, Divider, Flex, Text, useColorMode } from '@chakra-ui/core'

import { BluredImage, headingFontColor, Slug } from '../'
import { Collapse } from './collapse'
import { Share } from './share'

import { tags as tagStack } from '../../../contents/database/tags'

import { filterTagByType } from '../../services/functions'

import { ReaderProps } from '../../@types'

const Component: React.FC<ReaderProps & LazyComponentProps> = props => {
  const { raw, internal = true, scrollPosition } = props

  const { colorMode } = useColorMode()

  const hentai = raw.raw

  return (
    <Box py={2}>
      <Helmet title={hentai.title.pretty} />
      <Box py={2}>
        <Flex justifyContent='center'>
          <Box width={[22 / 24, 19 / 24, 16 / 24, 12 / 24]}>
            <Flex flexWrap='wrap'>
              <Box width={3 / 7} p={[2, 3]}>
                <Box overflow='hidden'>
                  <BluredImage
                    height={hentai.images.cover.h}
                    width={hentai.images.cover.w}
                    alt={`Cover ${hentai.title.pretty}`}
                    src={`https://t.nhentai.net/galleries/${
                      hentai.media_id
                    }/cover.${hentai.images.cover.t === 'p' ? 'png' : hentai.images.cover.t === 'j' ? 'jpg' : 'gif'}`}
                  />
                </Box>
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
              if (!raw.exclude.includes(i + 1)) {
                return (
                  <Box overflow='hidden' key={`reader-${raw.raw.id}-page-${i + 1}`}>
                    <BluredImage
                      height={page.h}
                      width={page.w}
                      alt={`Page ${i + 1}`}
                      scrollPosition={scrollPosition}
                      src={`https://i.nhentai.net/galleries/${
                        hentai.media_id
                      }/${i + 1}.${page.t === 'p' ? 'png' : page.t === 'j' ? 'jpg' : 'gif'}`}
                    />
                  </Box>
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

export const Reader = React.memo(trackWindowScroll(Component))
