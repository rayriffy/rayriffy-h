import React from 'react'
import ReactDOM from 'react-dom'

import Context from './src/store'

import App from './src/app/components'

export const wrapPageElement = ({ element, props }) => {
  return <App {...props}>{element}</App>
}

export const wrapRootElement = ({ element }) => {
  return <Context>{element}</Context>
}

export const onServiceWorkerUpdateFound = () => {
  document.getElementById('sw-update-found').style.display = 'flex'
}

export const onServiceWorkerInstalled = () => {
  document.getElementById('sw-update-found').style.display = 'none'
  document.getElementById('sw-update-installed').style.display = 'flex'

  setTimeout(() => {
    document.getElementById('sw-update-installed').style.display = 'none'
  }, 5000)
}

export const onServiceWorkerUpdateReady = () => {
  document.getElementById('sw-update-found').style.display = 'none'
  document.getElementById('sw-update-complete').style.display = 'flex'
}

export const replaceHydrateFunction = () => {
  return (element, container, callback) => {
    ReactDOM.createRoot(container, {
      hydrate: true,
      hydrationOptions: { onHydrated: callback },
    }).render(element)
  }
}
