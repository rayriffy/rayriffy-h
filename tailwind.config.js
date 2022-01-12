const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        black: '#000000',
      },
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
  content: [
    './apps/web-next/src/**/*.{js,jsx,ts,tsx}',
    './libs/constants/src/**/*.{js,jsx,ts,tsx}',
    './libs/datasource/src/**/*.{js,jsx,ts,tsx}',
    './libs/tags/src/**/*.{js,jsx,ts,tsx}',
    './libs/icons/src/**/*.{js,jsx,ts,tsx}',
  ],
}
