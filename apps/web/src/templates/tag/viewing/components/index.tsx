import React, { useContext, useEffect } from 'react'

import { Box, Flex } from '@chakra-ui/core'

import { Pagination, Poster } from '../../../../core/components'

import { Subtitle } from '../../../../store'

import { Props } from '../@types/Props'

const Page: React.FC<Props> = props => {
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
            <Poster key={`poster-${hentai.id}`} raw={hentai} />
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

export default Page
