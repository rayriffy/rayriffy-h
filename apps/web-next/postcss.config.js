module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-nesting': {},
    'postcss-flexbugs-fixes': {},
    // '@fullhuman/postcss-purgecss': {
    //   content: [
    //     './src/**/*.{js,jsx,ts,tsx}',
    //     './apps/web-next/src/**/*.{js,jsx,ts,tsx}',
    //     './libs/datasource/src/**/*.{js,jsx,ts,tsx}',
    //     './libs/icons/src/**/*.{js,jsx,ts,tsx}',
    //     // './components/**/*.{js,jsx,ts,tsx}',
    //   ],
    //   safelist: ['html', 'body'],
    //   defaultExtractor: content => content.match(/[\w-/:.%]+(?<!:)/g) || [],
    // }
  },
}
