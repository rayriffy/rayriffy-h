import React, { useContext, useEffect } from 'react'

import { Box } from 'rebass'

import { Subtitle } from '../app/context'

import NotAvaliable from '../core/components/notAvaliable'

const SearchComponent: React.FC = () => {
  const [, setSubtitle] = useContext(Subtitle)

  useEffect(() => {
    if (setSubtitle) {
      setSubtitle('custom')
    }
  }, [])

  return (
    <Box pt={3}>
      <NotAvaliable />
    </Box>
  )
}

export default SearchComponent
