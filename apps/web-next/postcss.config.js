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
    [
      '@fullhuman/postcss-purgecss',
      {
        content: [
          './src/**/*.{js,jsx,ts,tsx}',
          // './components/**/*.{js,jsx,ts,tsx}',
        ],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
      },
    ],
  ],
}
