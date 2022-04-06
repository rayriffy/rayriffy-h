import { FunctionComponent, createContext } from 'react'

import { customContext } from 'storeon/react'
import { store } from './storeon'

const StoreonContext = createContext(store)

export const useStoreon = customContext(StoreonContext)

export const Context: FunctionComponent = props => {
  const { children } = props

  return (
    <StoreonContext.Provider value={store}>{children}</StoreonContext.Provider>
  )
}
