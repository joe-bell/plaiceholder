/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  purge: ["./src/**/*.js", "./_site/**/*.html"],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [
    require("@plaiceholder/tailwindcss"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
