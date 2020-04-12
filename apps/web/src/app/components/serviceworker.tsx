import React from 'react'

import { Alert, AlertIcon, LightMode } from '@chakra-ui/core'

export const ServiceWorker: React.FC = () => {
  return (
    <LightMode>
      <Alert status='info' display='none' id='sw-update-found' color='black'>
        <AlertIcon />
        Updating application in background...
      </Alert>
      <Alert
        status='success'
        display='none'
        id='sw-update-complete'
        color='black'>
        <AlertIcon />
        Update completed! Reload required.
      </Alert>
      <Alert
        status='success'
        display='none'
        id='sw-update-installed'
        color='black'>
        <AlertIcon />
        Ready to work offline!
      </Alert>
    </LightMode>
  )
}
