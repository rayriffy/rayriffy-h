import React from 'react'

import { Box, Flex } from 'rebass'

import Pagination from '../../../../core/components/pagination'
import Poster from '../../../../core/components/poster'

import { IProps } from '../@types/IProps'

const HentaiListingComponent: React.FC<IProps> = props => {
  const {raw, tagStack, page} = props.pageContext

  return (
    <Box>
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
