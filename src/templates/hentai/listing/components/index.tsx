import React, { useContext, useEffect } from 'react'

import { Box, Flex } from 'rebass'

import Pagination from '../../../../core/components/pagination'
import Poster from '../../../../core/components/poster'

import { Subtitle } from '../../../../app/context'

import { IProps } from '../@types/IProps'

const HentaiListingComponent: React.FC<IProps> = props => {
  const {raw, tagStack, page} = props.pageContext

  const [, setSubtitle] = useContext(Subtitle)

  useEffect(() => {
    if (setSubtitle) {
      setSubtitle(`listing`)
    }
  }, [])

  return (
    <Box pt={2}>
      <Flex justifyContent={`center`}>
        <Box width={18 / 24} py={3}>
          <Pagination current={page.current} max={page.max} prefix={`/`} />
        </Box>
      </Flex>
      <Flex justifyContent={`center`}>
        <Box width={22 / 24}>
          <Flex flexWrap={`wrap`} alignItems={`center`}>
            {raw.map(hentai => (
              <Poster key={`poster-${hentai.data.id}`} raw={hentai.data.raw} tagStack={tagStack} />
            ))}
          </Flex>
        </Box>
      </Flex>
      <Flex justifyContent={`center`}>
        <Box width={18 / 24} py={3}>
          <Pagination current={page.current} max={page.max} prefix={`/`} />
        </Box>
      </Flex>
    </Box>
  )
}

export default HentaiListingComponent
