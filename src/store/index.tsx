import React, { Dispatch, SetStateAction, useState } from 'react'

import { useLocalStorage } from 'web-api-hooks'

import { ColorModeProvider, CSSReset, ThemeProvider } from '@chakra-ui/core'

import { theme } from './theme'

import { ICollection } from '../core/@types/ICollection'

type ISafeMode = [boolean, Dispatch<SetStateAction<boolean>>]
type ISubtitle = [string, Dispatch<SetStateAction<string>>]
type ICollectionContext = [ICollection, Dispatch<SetStateAction<ICollection>>]

export const SafeMode = React.createContext<ISafeMode>([true, () => {}])
export const Subtitle = React.createContext<ISubtitle>(['init', () => {}])
export const Collection = React.createContext<ICollectionContext>([
  { version: 0, data: [] },
  () => {},
])

const Context: React.FC = props => {
  const { children } = props

  // Safe mode
  const [safeMode, setSafeMode] = useLocalStorage<boolean>('blur', true)

  // Subtitle
  const [subtitle, setSubtitle] = useState<string>('init')

  // Collection
  const [collection, setCollection] = useLocalStorage<{
    version: number
    data: {
      id: number | string
      internal: boolean
      data: {
        id: number
        media_id: string
        title: {
          english: string
          japanese: string
          pretty: string
        }
        images: {
          cover: {
            t: 'j' | 'p'
            w: number
            h: number
          }
          pages: {
            t: 'j' | 'p'
            w: number
            h: number
          }[]
        }
        tags: {
          id: number
          type:
            | 'parody'
            | 'tag'
            | 'language'
            | 'character'
            | 'group'
            | 'artist'
            | 'category'
          name: string
        }[]
      }
    }[]
  }>('collection', {
    version: 1,
    data: [],
  })

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
