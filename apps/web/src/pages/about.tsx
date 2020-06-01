import React, { useEffect } from 'react'

import { useStoreon } from '../store'

const Page: React.FC = props => {
  const { dispatch } = useStoreon('subtitle')

  useEffect(() => {
    dispatch('subtitle/setSubtitle', 'about')
  }, [])

  return (
    <React.Fragment>OK</React.Fragment>
  )
}

export default Page
