import React from 'react'
import PropTypes from 'prop-types'

import {AppContextProvider} from './src/context/AppContext'

export const wrapRootElement = ({element}) => <AppContextProvider>{element}</AppContextProvider>

wrapRootElement.propTypes = {
  element: PropTypes.any,
}
