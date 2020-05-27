import React from 'react'

import { StoreContext } from 'storeon/react'
import { store } from './storeon'

export const Context: React.FC = props => {
  const { children } = props

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  )
}
