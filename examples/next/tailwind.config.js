const plaiceholder = require("@plaiceholder/tailwindcss");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@plaiceholder/ui/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [
    plaiceholder({
      resolver: (url) => {
        const fs = require("node:fs");
        const path = require("node:path");

        return fs.readFileSync(path.join("./public", url));
      },
    }),
  ],
};
