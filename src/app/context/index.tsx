import React, { Dispatch, SetStateAction, useState } from 'react'

import { useLocalStorage } from 'web-api-hooks'

type ISafeMode = [boolean, Dispatch<SetStateAction<boolean>>]
type ISubtitle = [string, Dispatch<SetStateAction<string>>]

export const SafeMode = React.createContext<ISafeMode>([true, () => {}])
export const Subtitle = React.createContext<ISubtitle>(['init', () => {}])

const Context: React.FC = props => {
  const {children} = props

  // Safe mode
  const [safeMode, setSafeMode] = useLocalStorage<boolean>('blur', true)

  // Subtitle
  const [subtitle, setSubtitle] = useState<string>('init')

  return (
    <SafeMode.Provider value={[safeMode, setSafeMode]}>
      <Subtitle.Provider value={[subtitle, setSubtitle]}>
        {children}
      </Subtitle.Provider>
    </SafeMode.Provider>
  )
}

export default Context
