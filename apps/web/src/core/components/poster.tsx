import React from 'react'

import { Link } from 'gatsby'

import { upperFirst } from 'lodash-es'

import { Box, Flex, Stack, Text, useColorMode } from '@chakra-ui/core'

import { BluredImage, Heading, Slug } from './'

import { filterTagByType, filterTagStackByType } from '../services/functions'

import { tags as allTagStack } from '../../contents/database/tags'

import { PosterProps } from '../@types'

const Component: React.FC<PosterProps> = props => {
  const { raw, internal = true } = props

  const { colorMode } = useColorMode()

  const tagStack = allTagStack.filter(
    tag => tag.name === 'parody' || tag.name === 'tag'
  )

  const language = filterTagByType(raw.tags, 'language').filter(
    tag => tag.name !== 'translated'
  )[0]

  const tagStackTag = filterTagStackByType(tagStack, 'tag')[0]
  const tagStackParody = filterTagStackByType(tagStack, 'parody')[0]

  return (
    <Box width={['100%', 1 / 2, 1 / 3, 1 / 5]} p={2}>
      <Box
        bg={colorMode === 'dark' ? 'gray.700' : undefined}
        borderRadius={8}
        border='1px solid #e8e8e8'
        overflow='hidden'>
        <Box overflow='hidden'>
          <Link
            to={`/${internal ? 'r' : 'g'}/${raw.id}`}
            aria-label={raw.title.pretty}>
            <BluredImage
              height={raw.images.cover.h}
              width={raw.images.cover.w}
              alt={`Cover ${raw.title.pretty}`}
              src={`https://t.nhentai.net/galleries/${raw.media_id}/cover.${
                raw.images.cover.t === 'p' ? 'png' : raw.images.cover.t === 'j' ? 'jpg' : 'gif'
              }`}
            />
          </Link>
        </Box>
        <Heading size='sm' pt={3} px={3}>
          {raw.title.pretty}
        </Heading>
        <Stack spacing={2} flexWrap='wrap' py={3} px={3} isInline={true}>
          {raw.tags.map(tag => {
            if (tag.type === 'tag') {
              return (
                <Slug
                  key={`slug-tag-${tag.id}`}
                  color={tagStackTag.color}
                  link={`/${tagStackTag.prefix}/${tag.id}`}
                  title={tag.name}
                />
              )
            } else if (tag.type === 'parody') {
              return (
                <Slug
                  key={`slug-parody-${tag.id}`}
                  color={tagStackParody.color}
                  link={`/${tagStackParody.prefix}/${tag.id}`}
                  title={tag.name}
                />
              )
            } else {
              return null
            }
          })}
        </Stack>
        {language ? (
          <Flex
            justifyContent='center'
            bg={
              language.name === `english`
                ? `blue.500`
                : language.name === `japanese`
                ? `red.500`
                : `black`
            }>
            <Text color='white' fontSize='xs' py={1}>
              {upperFirst(language.name)}
            </Text>
          </Flex>
        ) : null}
      </Box>
    </Box>
  )
}

export const Poster = React.memo(Component)
