import React from 'react'

import { css, Global } from '@emotion/core'

const AppComponent: React.FC = props => {
  const { children } = props

  return (
    <React.Fragment>
      <Global
        styles={css`
          html {
            height: 100%;
          }

          body {
            height: 100%;
            margin: 0;
          }

          #root {
            height: 100%;
          }

          @font-face {
            font-family: 'RM4SCC';
            src: url('/fonts/rm4scc.woff') format('woff');
          }
        `}
      />
      {children}
    </React.Fragment>
  )
}

export default AppComponent
