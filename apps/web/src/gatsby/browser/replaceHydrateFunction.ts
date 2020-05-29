import ReactDOM from 'react-dom'

export const replaceHydrateFunction = () => {
  return (element, container, callback) => {
    ReactDOM.unstable_createRoot(container, {
      hydrate: true,
      hydrationOptions: { onHydrated: callback },
    }).render(element)
  }
}
