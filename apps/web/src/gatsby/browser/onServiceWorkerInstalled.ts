import { GatsbyBrowser } from 'gatsby'

import { getElementById } from './functions'

export const onServiceWorkerInstalled: GatsbyBrowser['onServiceWorkerInstalled'] = () => {
  getElementById('sw-update-found').style.display = 'none'
  getElementById('sw-update-installed').style.display = 'flex'

  setTimeout(() => {
    getElementById('sw-update-installed').style.display = 'none'
  }, 5000)
}
