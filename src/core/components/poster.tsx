import React from 'react'

import { Link } from 'gatsby'

import { head, upperFirst } from 'lodash-es'

import { Box, Flex, Stack, Text, useColorMode } from '@chakra-ui/core'

import BluredImage from './bluredImage'
import Slug from './slug'

import { filterTagByType } from '../services/filterTagByType'
import { filterTagStackByType } from '../services/filterTagStackByType'

import { tags as allTagStack } from '../../contents/database/tags'

import Heading from './heading'

import { IPosterProps } from '../@types/IPosterProps'

const PosterComponent: React.FC<IPosterProps> = props => {
  const { raw, internal = true } = props

  const { colorMode } = useColorMode()

  const tagStack = allTagStack.filter(
    tag => tag.name === 'parody' || tag.name === 'tag'
  )

  const language = head(
    filterTagByType(raw.tags, 'language').filter(
      tag => tag.name !== 'translated'
    )
  )

  const tagStackTag = head(filterTagStackByType(tagStack, 'tag'))
  const tagStackParody = head(filterTagStackByType(tagStack, 'parody'))

  return (
    <Box width={['100%', 1 / 2, 1 / 3, 1 / 5]} p={2}>
      <Box
        bg={colorMode === 'dark' ? 'gray.700' : undefined}
        borderRadius={8}
        border='1px solid #e8e8e8'
        overflow='hidden'>
        <Link
          to={`/${internal ? 'r' : 'g'}/${raw.id}`}
          aria-label={raw.title.pretty}>
          <BluredImage
            height={raw.images.cover.h}
            alt={`Cover ${raw.title.pretty}`}
            src={`https://t.nhentai.net/galleries/${raw.media_id}/cover.${
              raw.images.cover.t === 'p' ? 'png' : 'jpg'
            }`}
          />
        </Link>
        <Box p={3}>
          <Heading size='sm'>{raw.title.pretty}</Heading>
          <Stack spacing={2} flexWrap='wrap' py={2} isInline={true}>
            {raw.tags.map(tag => {
              if (tag.type === 'tag') {
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
              } else if (tag.type === 'parody') {
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
              } else {
                return null
              }
            })}
          </Stack>
        </Box>
        {language ? (
          <Flex
            justifyContent='center'
            bg={
              language.name === `english`
                ? `#1890ff`
                : language.name === `japanese`
                ? `#f5222d`
                : `#000000`
            }>
            <Text color='white' fontSize={12} py={1}>
              {upperFirst(language.name)}
            </Text>
          </Flex>
        ) : null}
      </Box>
    </Box>
  )
}

export default React.memo(PosterComponent)
