import React from 'react'

import { customContext } from 'storeon/react'
import { store } from './storeon'

const StoreonContext = React.createContext(store)

export const useStoreon = customContext(StoreonContext)

export const Context: React.FC = props => {
  const { children } = props

  return (
    <StoreonContext.Provider value={store}>{children}</StoreonContext.Provider>
  )
}
