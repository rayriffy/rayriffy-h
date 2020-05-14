import React from 'react'

import DynamicViewing from '../templates/dynamic/viewing/components'

interface Props {
  location: {
    pathname: string
  }
}

const Page: React.FC<Props> = props => {
  return <DynamicViewing {...props} />
}

export default Page
