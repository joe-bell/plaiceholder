/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.js", "./_site/**/*.html"],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [require("@plaiceholder/tailwindcss")],
};
