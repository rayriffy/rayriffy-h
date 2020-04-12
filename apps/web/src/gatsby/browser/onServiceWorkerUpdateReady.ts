import { GatsbyBrowser } from 'gatsby'

import { getElementById } from './functions'

export const onServiceWorkerUpdateReady: GatsbyBrowser['onServiceWorkerUpdateReady'] = () => {
  getElementById('sw-update-found').style.display = 'none'
  getElementById('sw-update-complete').style.display = 'flex'
}
