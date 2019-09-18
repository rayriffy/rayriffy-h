import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { get as lsGet, set as lsSet } from 'local-storage'

type ISafeMode = [boolean, Dispatch<SetStateAction<boolean>>] | []
type ISubtitle = [string, Dispatch<SetStateAction<string>>] | []

export const SafeMode = React.createContext<ISafeMode>([])
export const Subtitle = React.createContext<ISubtitle>([])

const Context: React.FC = props => {
  const {children} = props

  // Safe mode
  const [safeMode, setSafeMode] = useState<boolean>(lsGet('blur') === null ? true : lsGet<boolean>('blur'))

  // Subtitle
  const [subtitle, setSubtitle] = useState<string>('init')

  useEffect(() => {
    if (lsGet('blur') === null) {
      lsSet('blur', true)
    }
  }, [])

  return (
    <SafeMode.Provider value={[safeMode, setSafeMode]}>
      <Subtitle.Provider value={[subtitle, setSubtitle]}>
        {children}
      </Subtitle.Provider>
    </SafeMode.Provider>
  )
}

export default Context
