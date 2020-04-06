// UNUSED: This hydrate function is being used for future major release of React with Concurrent Mode

import ReactDOM from 'react-dom'

import { GatsbyBrowser } from 'gatsby'

export const replaceHydrateFunction: GatsbyBrowser['replaceHydrateFunction'] = () => {
  return (
    element: React.DOMElement<React.DOMAttributes<Element>, Element>,
    container: Element,
    callback: () => {}
  ) => {
    ReactDOM.createRoot(container, {
      hydrate: true,
      hydrationOptions: { onHydrated: callback },
    }).render(element)
  }
}
