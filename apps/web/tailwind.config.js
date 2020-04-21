/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
  theme: {
    extend: {
      spacing: {
        '350': '350px',
      },
      screens: {
        'dark': {'raw': '(prefers-color-scheme: dark)'},
        'md:dark': {'raw': '(min-width: 768px) and (prefers-color-scheme: dark)'},
      },
      zIndex: {
        'hide': -1,
      },
    },
  },
  variants: {},
  plugins: [],
}
