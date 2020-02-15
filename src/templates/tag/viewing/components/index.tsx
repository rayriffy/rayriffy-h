import React, { useContext, useEffect } from 'react'

import { Box, Flex } from '@chakra-ui/core'

import Pagination from '../../../../core/components/pagination'
import Poster from '../../../../core/components/poster'

import { Subtitle } from '../../../../store'

import { IProps } from '../@types/IProps'

const TagViewingComponent: React.FC<IProps> = props => {
  const { raw, page, tag, prefix, subtitle } = props.pageContext

  const { 1: setSubtitle } = useContext(Subtitle)

  useEffect(() => {
    setSubtitle(`${subtitle}`)
  }, [])

  return (
    <React.Fragment>
      <Flex justifyContent='center'>
        <Box width={18 / 24} pt={3} pb={6}>
          <Pagination
            current={page.current}
            max={page.max}
            prefix={`/${prefix}/${tag.id}/`}
          />
        </Box>
      </Flex>
      <Flex justifyContent='center'>
        <Flex width={22 / 24} flexWrap='wrap' alignItems='center'>
          {raw.map(hentai => (
            <Poster key={`poster-${hentai.data.id}`} raw={hentai.data.raw} />
          ))}
        </Flex>
      </Flex>
      <Flex justifyContent='center'>
        <Box width={18 / 24} py={3}>
          <Pagination
            current={page.current}
            max={page.max}
            prefix={`/${prefix}/${tag.id}/`}
          />
        </Box>
      </Flex>
    </React.Fragment>
  )
}

export default TagViewingComponent
