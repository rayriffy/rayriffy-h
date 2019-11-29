import React from 'react'

import { Alert, AlertIcon } from '@chakra-ui/core'

const ServiceWorkerComponent: React.FC = () => {
  return (
    <React.Fragment>
      <Alert status='info' display='none' id='sw-update-found'>
        <AlertIcon />
        Updating application in background...
      </Alert>
      <Alert status='success' display='none' id='sw-update-complete'>
        <AlertIcon />
        Update completed! Reload required.
      </Alert>
    </React.Fragment>
  )
}

export default ServiceWorkerComponent
