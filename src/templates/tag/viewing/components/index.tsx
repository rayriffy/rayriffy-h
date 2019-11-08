import React, { useContext, useEffect } from 'react'

import { Box, Flex } from 'rebass'

import Pagination from '../../../../core/components/pagination'
import Poster from '../../../../core/components/poster'

import { Subtitle } from '../../../../app/context'

import { IProps } from '../@types/IProps'

const TagViewingComponent: React.FC<IProps> = props => {
  const {raw, page, tag, prefix, subtitle} = props.pageContext

  const [, setSubtitle] = useContext(Subtitle)

  useEffect(() => {
    setSubtitle(`${subtitle}`)
  }, [])

  return (
    <Box>
      <Flex justifyContent={`center`}>
        <Box width={18 / 24} py={3}>
          <Pagination current={page.current} max={page.max} prefix={`/${prefix}/${tag.id}/`} />
        </Box>
      </Flex>
      <Flex justifyContent={`center`}>
        <Box width={22 / 24}>
          <Flex flexWrap={`wrap`} alignItems={`center`}>
            {raw.map(hentai => (
              <Poster key={`poster-${hentai.data.id}`} raw={hentai.data.raw} />
            ))}
          </Flex>
        </Box>
      </Flex>
      <Flex justifyContent={`center`}>
        <Box width={18 / 24} py={3}>
          <Pagination current={page.current} max={page.max} prefix={`/${prefix}/${tag.id}/`} />
        </Box>
      </Flex>
    </Box>
  )
}

export default TagViewingComponent
