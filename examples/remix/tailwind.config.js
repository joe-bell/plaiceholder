/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@plaiceholder/ui/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [require("@plaiceholder/tailwindcss")],
};
