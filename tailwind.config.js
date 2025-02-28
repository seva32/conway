const customColors = require('./tailwind.customColors'); 

module.exports = {
  purge: ['./src/**/*.html', './src/**/*.js'],
  theme: {
    colors: {
      ...customColors,
    },
    extend: {
      screens: {
        smMax: { max: '767px' },
        // es para usar en el nav bar con @screen smMax { thead ... }
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
