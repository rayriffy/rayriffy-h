import React, { useEffect } from 'react'

import { useStoreon } from 'storeon/react'
import { Store, Event } from '../store/storeon'

const Page: React.FC = props => {
  const { dispatch } = useStoreon<Store, Event>('subtitle')

  useEffect(() => {
    dispatch('subtitle/setSubtitle', 'about')
  }, [])

  return (
    <>OK</>
  )
}

export default Page
