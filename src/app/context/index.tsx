import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { get as lsGet, set as lsSet } from 'local-storage'

type ISafeMode = [boolean, Dispatch<SetStateAction<boolean>>] | []

export const SafeMode = React.createContext<ISafeMode>([])

const Context: React.FC = props => {
  const {children} = props

  // Safe mode
  const [safeMode, setSafeMode] = useState<boolean>(lsGet('blur') === null ? true : lsGet<boolean>('blur'))

  useEffect(() => {
    if (lsGet('blur') === null) {
      lsSet('blur', true)
    }
  }, [])

  return (
    <SafeMode.Provider value={[safeMode, setSafeMode]}>
      {children}
    </SafeMode.Provider>
  )
}

export default Context
