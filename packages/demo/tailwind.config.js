module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ["./{components,pages,styles}/**/*.{js,ts,jsx,tsx}"],
  theme: {},
  variants: {},
};
