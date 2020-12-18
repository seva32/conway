const customColors = require('./tailwind.customColors');

module.exports = {
  purge: ['./src/**/*.html', './src/**/*.js'],
  theme: {
    colors: {
      ...customColors,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
