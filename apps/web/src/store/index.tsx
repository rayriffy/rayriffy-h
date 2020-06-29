import React from 'react'

import { customContext } from 'storeon/react'
import { store } from './storeon'

const StoreonContext = React.createContext(store)

export const useStoreon = customContext(StoreonContext)

export const Context: React.FC = props => {
  const { children } = props

  const clientSession = Math.random().toString(36).substring(3)

  return (
    <StoreonContext.Provider value={store}>
      {clientSession}
      {children}
    </StoreonContext.Provider>
  )
}
