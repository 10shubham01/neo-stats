const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
    './node_modules/vue-tailwind-datepicker/**/*.js',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'vtd-primary': colors.blue,
        'vtd-secondary': colors.black,
      },
      keyframes: {
        toast: {
          from: {
            opacity: 0,
            transform: 'translateY(-10px)',
          },
          to: {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
