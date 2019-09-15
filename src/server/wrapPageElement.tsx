import { WrapPageElementBrowserArgs } from 'gatsby'

import App from '../app/components'

export const wrapPageElement = ({ element, props }: WrapPageElementBrowserArgs) => {
  return <App {...props}>{element}</App>
}
