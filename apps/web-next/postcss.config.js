module.exports = {
  plugins: [
    'tailwindcss',
    'postcss-nesting',
    'postcss-flexbugs-fixes',
    [
      'cssnano',
      {
        preset: 'advanced',
      },
    ],
  ],
}
