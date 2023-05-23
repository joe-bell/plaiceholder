// @ts-check
import fs from "node:fs";
import path from "node:path";
import plaiceholder from "@plaiceholder/tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./node_modules/@plaiceholder/ui/**/*.{ts,tsx}",
    "./src/**/*.{astro,html,js,jsx,svelte,ts,tsx,vue}",
  ],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [
    plaiceholder({
      resolver: (src) =>
        fs.readFileSync(path.join("./src/assets/images", `${src}.jpg`)),
    }),
  ],
};
