import { GatsbyBrowser } from 'gatsby'

import { getElementById } from './functions/getElementById'

export const onServiceWorkerUpdateReady: GatsbyBrowser['onServiceWorkerUpdateReady'] = () => {
  getElementById('sw-update-found').style.display = 'none'
  getElementById('sw-update-green').style.display = 'flex'
  getElementById('sw-update-complete').style.display = 'flex'
}
