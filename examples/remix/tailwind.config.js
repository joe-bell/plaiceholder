/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  purge: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [
    require("@plaiceholder/tailwindcss"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
