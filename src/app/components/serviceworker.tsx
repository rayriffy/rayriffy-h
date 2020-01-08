import React from 'react'

import { Alert, AlertIcon, LightMode } from '@chakra-ui/core'

const ServiceWorkerComponent: React.FC = () => {
  return (
    <LightMode>
      <Alert status='info' display='none' id='sw-update-found'>
        <AlertIcon />
        Updating application in background...
      </Alert>
      <Alert status='success' display='none' id='sw-update-complete'>
        <AlertIcon />
        Update completed! Reload required.
      </Alert>
      <Alert status='success' display='none' id='sw-update-installed'>
        <AlertIcon />
        Ready to work offline!
      </Alert>
    </LightMode>
  )
}

export default ServiceWorkerComponent
