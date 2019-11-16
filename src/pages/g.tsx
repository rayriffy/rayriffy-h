import React from 'react'

import DynamicViewing from '../templates/dynamic/viewing/components'

interface IProps {
  location: {
    pathname: string
  }
}

const DynamicGComponent: React.FC<IProps> = props => {
  return <DynamicViewing {...props} />
}

export default DynamicGComponent
