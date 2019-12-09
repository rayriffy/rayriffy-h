import React from 'react'

import { Link } from 'gatsby'
import { filter, head, upperFirst } from 'lodash'

import { Box, Flex, Stack, Text, useColorMode } from '@chakra-ui/core'
import styled from '@emotion/styled'

import BluredImage from './bluredImage'
import Slug from './slug'

import { filterTagByType } from '../services/filterTagByType'
import { filterTagStackByType } from '../services/filterTagStackByType'

import allTagStack from '../../contents/database/tags'

import Heading from './heading'

import { IPosterProps } from '../@types/IPosterProps'

const BorderedCard = styled(Box)`
  border-radius: 8px;
  border: 1px solid #e8e8e8;
`

const CoverBox = styled(Box)`
  overflow: hidden;
  border-radius: 8px 8px 0 0;
`

const CoverImage = styled(BluredImage)`
  border-radius: 8px 8px 0 0;
`

const FooterBox = styled(Box)`
  border-radius: 0 0 8px 8px;
`

const PosterComponent: React.FC<IPosterProps> = props => {
  const { raw, internal = true } = props

  const { colorMode } = useColorMode()

  const tagStack = filter(
    allTagStack,
    tag => tag.name === 'parody' || tag.name === 'tag'
  )

  const language = head(
    filter(
      filterTagByType(raw.tags, 'language'),
      tag => tag.name !== 'translated'
    )
  )
  const tags = filterTagByType(raw.tags, 'tag')
  const parodies = filterTagByType(raw.tags, 'parody')

  const tagStackTag = head(filterTagStackByType(tagStack, 'tag'))
  const tagStackParody = head(filterTagStackByType(tagStack, 'parody'))

  return (
    <Box width={['100%', 1 / 2, 1 / 3, 1 / 5]} p={2}>
      <BorderedCard bg={colorMode === 'dark' ? 'gray.700' : undefined}>
        <CoverBox>
          <Link
            to={`/${internal ? 'r' : 'g'}/${raw.id}`}
            aria-label={raw.title.pretty}>
            <CoverImage
              height={raw.images.cover.h}
              alt={`Cover ${raw.title.pretty}`}
              src={`https://t.nhentai.net/galleries/${raw.media_id}/cover.${
                raw.images.cover.t === 'p' ? 'png' : 'jpg'
              }`}
            />
          </Link>
        </CoverBox>
        <Box p={3}>
          <Heading size='sm'>{raw.title.pretty}</Heading>
          <Stack spacing={2} flexWrap='wrap' py={2} isInline={true}>
            {tags.map(tag => {
              if (tagStackTag) {
                return (
                  <Slug
                    key={`slug-tag-${tag.id}`}
                    color={tagStackTag.color}
                    link={`/${tagStackTag.prefix}/${tag.id}`}
                    title={tag.name}
                  />
                )
              } else {
                return <Slug key={`slug-tag-${tag.id}`} title={tag.name} />
              }
            })}
            {parodies.map(tag => {
              if (tagStackParody) {
                return (
                  <Slug
                    key={`slug-parody-${tag.id}`}
                    color={tagStackParody.color}
                    link={`/${tagStackParody.prefix}/${tag.id}`}
                    title={tag.name}
                  />
                )
              } else {
                return <Slug key={`slug-parody-${tag.id}`} title={tag.name} />
              }
            })}
          </Stack>
        </Box>
        {language ? (
          <FooterBox
            backgroundColor={
              language.name === `english`
                ? `#1890ff`
                : language.name === `japanese`
                ? `#f5222d`
                : `#000000`
            }>
            <Flex justifyContent='center'>
              <Text color='white' fontSize={12} py={1}>
                {upperFirst(language.name)}
              </Text>
            </Flex>
          </FooterBox>
        ) : null}
      </BorderedCard>
    </Box>
  )
}

export default React.memo(PosterComponent)
