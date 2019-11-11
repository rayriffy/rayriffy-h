import React from 'react'

import { Box } from 'rebass'
import styled from 'styled-components'

const DividerComponent = styled(Box)`
  border-top-width: 0px;
  border-left-width: 0px;
  border-right-width: 0px;
  border-bottom-width: 1px;

  border-style: solid;
  border-color: #e8e8e8;
`

export default React.memo(DividerComponent)
