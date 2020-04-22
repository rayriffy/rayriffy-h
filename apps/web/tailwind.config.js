/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
  theme: {
    columnCount: [1, 2, 3, 4],
    filter: {
      'none': 'none',
      'blur': 'blur(15px)',
    },
    backdropFilter: {
      'none': 'none',
      'blur': 'blur(5px)',
      'blur-heavy': 'blur(20px)',
    },
    extend: {
      backgroundColor: {
        'black-overlay': 'rgba(0, 0, 0, 0.75)',
        'white-a40': 'rgba(255, 255, 255, 0.4)',
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
  variants: {
    filter: ['responsive', 'hover'],
    backdropFilter: ['responsive', 'hover'],
    columnCount: ['responsive'],
    display: ['responsive', 'hover', 'group-hover'],
  },
  backgroundColors: {
    black: '#000'
  },
  plugins: [
    require('tailwindcss-filters'),
    require('tailwindcss-multi-column')(),
  ],
}
