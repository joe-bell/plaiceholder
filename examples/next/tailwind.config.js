module.exports = {
  mode: "jit",
  purge: [
    "./node_modules/\\@plaiceholder/ui/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
