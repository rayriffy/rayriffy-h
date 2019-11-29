import React from 'react'

import App from './src/app/components'

export const wrapPageElement = ({ element, props }) => {
  return <App {...props}>{element}</App>
}

export const onClientEntry = () => {
  if (process.env.NODE_ENV !== `production`) {
    require(`preact/debug`)
  }
}

export const onServiceWorkerUpdateFound = () => {
  document.getElementById('sw-update-found').style.display = 'flex'
}

export const onServiceWorkerInstalled = () => {
  document.getElementById('sw-update-found').style.display = 'none'
  document.getElementById('sw-update-installed').style.display = 'flex'
}

export const onServiceWorkerUpdateReady = () => {
  document.getElementById('sw-update-found').style.display = 'none'
  document.getElementById('sw-update-complete').style.display = 'flex'
}
