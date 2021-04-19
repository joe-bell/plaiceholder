module.exports = {
  mode: "jit",
  purge: ["./src/{components,pages,styles}/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [
    require("@plaiceholder/tailwindcss"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
