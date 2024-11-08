const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './app/**/*.{html,js,ts}',
    './*.html',
    './styles/*.css',
    './public/*.html'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var']
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    
    require('@tailwindcss/typography'),
    
  ]
}
