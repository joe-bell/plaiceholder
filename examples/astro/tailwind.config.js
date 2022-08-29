module.exports = {
  content: [
    "./node_modules/@plaiceholder/ui/**/*.{ts,tsx}",
    "./src/**/*.{astro,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [require("@plaiceholder/tailwindcss")],
};
