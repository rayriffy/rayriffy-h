module.exports = {
  theme: {
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
  plugins: [require('@tailwindcss/ui'), require('tailwindcss-filters')],
  purge: [
    './apps/web-next/src/**/*.html',
    './apps/web-next/src/**/*.tsx',
    './apps/web-next/src/**/*.ts',
    './apps/web-next/src/**/*.jsx',
    './apps/web-next/src/**/*.js',
  ],
}
