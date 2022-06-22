/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  purge: [
    "./node_modules/@plaiceholder/ui/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [
    require("@plaiceholder/tailwindcss"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
