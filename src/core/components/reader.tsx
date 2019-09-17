import _ from 'lodash'
import React from 'react'

import { Box, Flex, Image, Text } from 'rebass'
import styled from 'styled-components'

import Collapse from './collapse'
import Divider from './divider'
import Slug from './slug'

import { filterTagByType } from '../services/filterTagByType'

import { IReaderProps } from '../@types/IReaderProps'

const ImageBox = styled(Box)`
  overflow: hidden;
`

const BluredImage = styled(Image)`
  filter: blur(15px);
  width: 100%;
`

const ReaderComponent: React.FC<IReaderProps> = props => {
  const {raw, tagStack} = props

  const hentai = raw.data.raw

  return (
    <Box py={2}>
      <Box py={2}>
        <Flex justifyContent={`center`}>
          <Box width={[22 / 24, 19 / 24, 16 / 24, 12 / 24]}>
            <Flex flexWrap={`wrap`}>
              <Box width={3 / 7} p={[2, 3]}>
                <ImageBox>
                  <BluredImage src={`https://t.nhentai.net/galleries/${hentai.media_id}/cover.${hentai.images.cover.t === 'p' ? 'png' : 'jpg'}`} />
                </ImageBox>
              </Box>
              <Box width={4 / 7} p={[2, 3]}>
                <Text fontSize={22} fontWeight={600} color={`rgba(0, 0, 0, 0.85)`}>{hentai.title.pretty}</Text>
                <Box py={2}>
                  {tagStack.map((stack, i) => {
                    const res = filterTagByType(hentai.tags, stack.name)

                    if (!_.isEmpty(res)) {
                      return (
                        <Box>
                          {i !== 0 ? <Divider py={1} /> : null}
                          <Collapse key={`collapse-${hentai.id}-${stack.name}`} title={_.upperFirst(stack.name)} defaultState={stack.name === 'tag'}>
                            <Flex flexWrap={`wrap`}>
                              {res.map(tag => {
                                return (
                                  <Slug key={`slug-${hentai.id}-${stack.name}-${tag.id}`} border={stack.color.border} background={stack.color.background} text={stack.color.text} link={`/${stack.prefix}/${tag.id}`}>{tag.name}</Slug>
                                )
                              })}
                            </Flex>
                          </Collapse>
                        </Box>
                      )
                    } else {
                      return null
                    }
                  })}
                </Box>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Box>
      <Box py={2}>
        <Flex justifyContent={`center`}>
          <Box  width={[1, 22 / 24, 16 / 24, 12 / 24]}>
            {hentai.images.pages.map((page, i) => {
              return (
                <ImageBox key={`reader-${raw.data.id}-page-${i + 1}`}>
                  <BluredImage src={`https://i.nhentai.net/galleries/${hentai.media_id}/${i + 1}.${page.t === 'p' ? 'png' : 'jpg'}`} />
                </ImageBox>
              )
            })}
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}

export default ReaderComponent
