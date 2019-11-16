import React, { useState } from 'react'

import { Collapse } from 'react-collapse'

import { Box, Text } from 'rebass'

import { IReaderCollapseProps } from '../../@types/IReaderCollapseProps'

const ReaderCollapseComponent: React.FC<IReaderCollapseProps> = props => {
  const { defaultState = false, title, children } = props

  const [isShow, setIsShow] = useState(defaultState)

  return (
    <React.Fragment>
      <Box p={1}>
        <Text fontSize={14} onClick={() => setIsShow(prev => !prev)}>
          {title}
        </Text>
      </Box>
      <Collapse isOpened={isShow}>
        <Box p={2}>{children}</Box>
      </Collapse>
    </React.Fragment>
  )
}

export default ReaderCollapseComponent
