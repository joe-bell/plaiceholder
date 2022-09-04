import { defineConfig } from "astro/config";

import image from "@astrojs/image";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  integrations: [image(), tailwind()],
  vite: {
    ssr: {
      external: ["image-size", "tiny-glob"],
    },
  },
});
