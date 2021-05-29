module.exports = {
  mode: "jit",
  purge: ["./_site/**/*.html", "./src/**/*.{js}"],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [
    require("@plaiceholder/tailwindcss"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
