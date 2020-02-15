import React, { Dispatch, SetStateAction, useState } from 'react'

import { useLocalStorage } from 'web-api-hooks'

import { ICollection } from '../core/@types/ICollection'
import { ISettings } from '../core/@types/ISettings'

type ISettingsContext = [ISettings, Dispatch<SetStateAction<ISettings>>]
type ISubtitle = [string, Dispatch<SetStateAction<string>>]
type ICollectionContext = [ICollection, Dispatch<SetStateAction<ICollection>>]

export const Settings = React.createContext<ISettingsContext>([
  {
    safemode: true,
    lefthand: false,
  },
  () => {},
])
export const Subtitle = React.createContext<ISubtitle>(['init', () => {}])
export const Collection = React.createContext<ICollectionContext>([
  { version: 0, data: [] },
  () => {},
])

const Context: React.FC = props => {
  const { children } = props

  // Safe mode
  const { 0: settings, 1: setSettings } = useLocalStorage<{
    safemode: boolean
    lefthand: boolean
  }>('settings', {
    safemode: true,
    lefthand: false,
  })

  // Subtitle
  const { 0: subtitle, 1: setSubtitle } = useState<string>('init')

  // Collection
  const { 0: collection, 1: setCollection } = useLocalStorage<{
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
    <Settings.Provider value={[settings, setSettings]}>
      <Subtitle.Provider value={[subtitle, setSubtitle]}>
        <Collection.Provider value={[collection, setCollection]}>
          {children}
        </Collection.Provider>
      </Subtitle.Provider>
    </Settings.Provider>
  )
}

export default Context
