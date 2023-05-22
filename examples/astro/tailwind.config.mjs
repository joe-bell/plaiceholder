// @ts-check
import fs from "node:fs";
import path from "node:path";
import plaiceholder from "@plaiceholder/tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./node_modules/@plaiceholder/ui/**/*.{ts,tsx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [
    plaiceholder({
      resolver: (url) => fs.readFileSync(path.join("./public", url)),
    }),
  ],
};
