import React, { useContext, useEffect, useMemo } from 'react'

import { Box, Flex } from '@chakra-ui/core'

import { Pagination, Poster } from '../../../../core/components'

import { Subtitle } from '../../../../store'

import { Props } from '../@types/Props'

const Page: React.FC<Props> = props => {
  const { raw, page } = props.pageContext

  const { 1: setSubtitle } = useContext(Subtitle)

  useEffect(() => {
    setSubtitle(`listing`)
  }, [])

  const pagination = useMemo<React.ReactNode>(
    () => (
      <Flex justifyContent='center' pt={2}>
        <Box width={18 / 24} pt={3} pb={6}>
          <Pagination current={page.current} max={page.max} prefix='/' />
        </Box>
      </Flex>
    ),
    []
  )

  return (
    <React.Fragment>
      {pagination}
      <Flex justifyContent='center'>
        <Flex
          width={22 / 24}
          flexWrap='wrap'
          justifyContent='center'
          alignItems='center'>
          {raw.map(hentai => (
            <Poster key={`poster-${hentai.id}`} raw={hentai} />
          ))}
        </Flex>
      </Flex>
      {pagination}
    </React.Fragment>
  )
}

export default Page
