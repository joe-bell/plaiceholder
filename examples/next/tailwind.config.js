module.exports = {
  content: [
    "./node_modules/@plaiceholder/ui/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [require("@plaiceholder/tailwindcss")],
};
