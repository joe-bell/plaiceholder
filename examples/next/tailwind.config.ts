import type { Config } from "tailwindcss";
import fs from "node:fs";
import path from "node:path";
import plaiceholder from "@plaiceholder/tailwindcss";

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
} satisfies Config;
