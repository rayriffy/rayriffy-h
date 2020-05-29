import React, { useEffect } from 'react'

import { useStoreon } from '../store'

const Page: React.FC = props => {
  const { dispatch } = useStoreon('subtitle')

  useEffect(() => {
    dispatch('subtitle/setSubtitle', 'about')
  }, [])

  return (
    <>OK</>
  )
}

export default Page
