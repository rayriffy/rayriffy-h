import { GatsbyBrowser } from 'gatsby'

import { getElementById } from './functions/getElementById'

export const onServiceWorkerUpdateFound: GatsbyBrowser['onServiceWorkerUpdateFound'] = () => {
  getElementById('sw-update-found').style.display = 'flex'
}
