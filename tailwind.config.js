module.exports = {
  mode: 'jit',
  theme: {
    extend: {
      backgroundColor: {
        'black-overlay': 'rgba(0, 0, 0, 0.60)',
      },
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
  content: [
    './src/**/*.html',
    './src/**/*.tsx',
    './src/**/*.ts',
    './src/**/*.jsx',
    './src/**/*.js',
  ],
}
