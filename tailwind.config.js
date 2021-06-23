const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  theme: {
    colors: {
      white: '#ffffff',
      black: '#000000',
      bluegray: colors.blueGray,
      coolgray: colors.coolGray,
      gray: colors.gray,
      truegray: colors.trueGray,
      warmgray: colors.warmGray,
      red: colors.red,
      orange: colors.orange,
      amber: colors.amber,
      yellow: colors.yellow,
      lime: colors.lime,
      green: colors.green,
      emerald: colors.emerald,
      teal: colors.teal,
      cyan: colors.cyan,
      lightblue: colors.lightBlue,
      blue: colors.blue,
      indigo: colors.indigo,
      violet: colors.violet,
      purple: colors.purple,
      pink: colors.pink,
      rose: colors.rose,
    },
    filter: {
      none: 'none',
      blur: 'blur(15px)',
    },
    backdropFilter: {
      none: 'none',
      blur: 'blur(5px)',
      'blur-heavy': 'blur(20px)',
    },
    extend: {
      backgroundColor: {
        'black-overlay': 'rgba(0, 0, 0, 0.60)',
      },
    },
  },
  variants: {},
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-filters'),
  ],
  purge: {
    enabled: true,
    content: [
      './apps/web-next/src/**/*.{js,jsx,ts,tsx}',
      './libs/constants/src/**/*.{js,jsx,ts,tsx}',
      './libs/datasource/src/**/*.{js,jsx,ts,tsx}',
      './libs/tags/src/**/*.{js,jsx,ts,tsx}',
      './libs/icons/src/**/*.{js,jsx,ts,tsx}',
    ],
  }
}
