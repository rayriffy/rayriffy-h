import React, { useContext, useEffect } from 'react'

import { Box, Flex } from '@chakra-ui/core'

import Pagination from '../../../../core/components/pagination'
import Poster from '../../../../core/components/poster'

import { Subtitle } from '../../../../store'

import { IProps } from '../@types/IProps'

const HentaiListingComponent: React.FC<IProps> = props => {
  const { raw, page } = props.pageContext

  const [, setSubtitle] = useContext(Subtitle)

  useEffect(() => {
    setSubtitle(`listing`)
  }, [])

  return (
    <React.Fragment>
      <Flex justifyContent='center' pt={2}>
        <Box width={18 / 24} pt={3} pb={6}>
          <Pagination current={page.current} max={page.max} prefix='/' />
        </Box>
      </Flex>
      <Flex justifyContent='center'>
        <Box width={22 / 24}>
          <Flex flexWrap='wrap' alignItems='center'>
            {raw.map(hentai => (
              <Poster key={`poster-${hentai.data.id}`} raw={hentai.data.raw} />
            ))}
          </Flex>
        </Box>
      </Flex>
      <Flex justifyContent='center'>
        <Box width={18 / 24} pt={8} pb={12}>
          <Pagination current={page.current} max={page.max} prefix={`/`} />
        </Box>
      </Flex>
    </React.Fragment>
  )
}

export default HentaiListingComponent
