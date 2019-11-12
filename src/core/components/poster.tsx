import _ from 'lodash'
import React from 'react'

import { Link } from 'gatsby'

import { Box, Card, Flex, Text } from 'rebass'
import styled from 'styled-components'

import Slug from './slug'

import { filterTagByType } from '../services/filterTagByType'
import { filterTagStackByType } from '../services/filterTagStackByType'

import allTagStack from '../../contents/database/tags'

import BluredImage from './bluredImage'

import { IPosterProps } from '../@types/IPosterProps'

const BorderedCard = styled(Card)`
  border-radius: 8px;
  border: 1px solid #e8e8e8;

  background: #fff;
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
  const {raw} = props

  const tagStack = _.filter(allTagStack, tag => tag.name === 'parody' || tag.name === 'tag')

  const language = _.head(_.filter(filterTagByType(raw.tags, 'language'), tag => tag.name !== 'translated'))
  const tags = filterTagByType(raw.tags, 'tag')
  const parodies = filterTagByType(raw.tags, 'parody')

  const tagStackTag = _.head(filterTagStackByType(tagStack, 'tag'))
  const tagStackParody = _.head(filterTagStackByType(tagStack, 'parody'))

  return (
    <Box width={[1, 1 / 2, 1 / 3, 1 / 5]} p={2}>
      <BorderedCard>
        <CoverBox>
          <Link to={`/r/${raw.id}`}>
            <CoverImage height={raw.images.cover.h} src={`https://t.nhentai.net/galleries/${raw.media_id}/cover.${raw.images.cover.t === 'p' ? 'png' : 'jpg'}`} />
          </Link>
        </CoverBox>
        <Box p={3}>
          <Text fontWeight={500}>{raw.title.pretty}</Text>
          <Box py={2}>
            <Flex flexWrap={`wrap`}>
              {tags.map(tag => {
                if (tagStackTag) {
                  const {border, background, text} = tagStackTag.color

                  return (
                    <Slug key={`slug-tag-${tag.id}`} background={background} border={border} text={text} link={`/${tagStackTag.prefix}/${tag.id}`} title={tag.name} />
                  )
                } else {
                  return (
                    <Slug key={`slug-tag-${tag.id}`} title={tag.name} />
                  )
                }
              })}
              {parodies.map(tag => {
                if (tagStackParody) {
                  const {border, background, text} = tagStackParody.color

                  return (
                    <Slug key={`slug-parody-${tag.id}`} background={background} border={border} text={text} link={`/${tagStackParody.prefix}/${tag.id}`} title={tag.name} />
                  )
                } else {
                  return (
                    <Slug key={`slug-parody-${tag.id}`} title={tag.name} />
                  )
                }
              })}
            </Flex>
          </Box>
        </Box>
        {language ? (
          <FooterBox backgroundColor={language.name === `english` ? `#1890ff` : language.name === `japanese` ? `#f5222d` : `#000000`}>
            <Flex justifyContent={`center`}>
              <Text color={`#ffffff`} fontSize={12} py={1}>{_.upperFirst(language.name)}</Text>
            </Flex>
          </FooterBox>
        ) : null}
      </BorderedCard>
    </Box>
  )
}

export default React.memo(PosterComponent)
