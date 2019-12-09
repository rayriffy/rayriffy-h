import React, { Dispatch, SetStateAction, useState } from 'react'

import { useLocalStorage } from 'web-api-hooks'

import { ColorModeProvider, CSSReset, ThemeProvider } from '@chakra-ui/core'

import { theme } from './theme'

type ISafeMode = [boolean, Dispatch<SetStateAction<boolean>>]
type ISubtitle = [string, Dispatch<SetStateAction<string>>]
type ICollection = [string, Dispatch<SetStateAction<string>>]

export const SafeMode = React.createContext<ISafeMode>([true, () => {}])
export const Subtitle = React.createContext<ISubtitle>(['init', () => {}])
export const Collection = React.createContext<ICollection>(['[]', () => {}])

const Context: React.FC = props => {
  const { children } = props

  // Safe mode
  const [safeMode, setSafeMode] = useLocalStorage<boolean>('blur', true)

  // Subtitle
  const [subtitle, setSubtitle] = useState<string>('init')

  // Collection
  const [collection, setCollection] = useLocalStorage<string>(
    'collection',
    '[]'
  )

  return (
    <SafeMode.Provider value={[safeMode, setSafeMode]}>
      <Subtitle.Provider value={[subtitle, setSubtitle]}>
        <Collection.Provider value={[collection, setCollection]}>
          <ThemeProvider theme={theme}>
            <ColorModeProvider>
              <CSSReset />
              {children}
            </ColorModeProvider>
          </ThemeProvider>
        </Collection.Provider>
      </Subtitle.Provider>
    </SafeMode.Provider>
  )
}

export default Context
