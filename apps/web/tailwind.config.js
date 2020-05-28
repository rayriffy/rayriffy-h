/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
  theme: {
    // spinner: {
    //   default: {
    //     size: '1em',
    //     border: '2px',
    //     speed: '500ms',
    //   },
    // },
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
    display: ['responsive', 'hover', 'group-hover'],
    visibility: ['responsive', 'hover', 'focus', 'group-hover'],
  },
  backgroundColors: {
    black: '#000'
  },
  plugins: [
    require('tailwindcss-filters'),
  ],
  purge: [
    './src/**/*.html',
    './src/**/*.tsx',
    './src/**/*.ts',
    './src/**/*.jsx',
    './src/**/*.js',
  ]
}
