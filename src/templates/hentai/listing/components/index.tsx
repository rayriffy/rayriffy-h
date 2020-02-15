import React, { useContext, useEffect, useMemo } from 'react'

import { Box, Flex } from '@chakra-ui/core'

import Pagination from '../../../../core/components/pagination'
import Poster from '../../../../core/components/poster'

import { Subtitle } from '../../../../store'

import { IProps } from '../@types/IProps'

const HentaiListingComponent: React.FC<IProps> = props => {
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
            <Poster key={`poster-${hentai.data.id}`} raw={hentai.data.raw} />
          ))}
        </Flex>
      </Flex>
      {pagination}
    </React.Fragment>
  )
}

export default HentaiListingComponent
