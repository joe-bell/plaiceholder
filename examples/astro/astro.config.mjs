import { defineConfig } from "astro/config";

import image from "@astrojs/image";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [image(), tailwind()],
  ssr: {
    external: ["@astrojs/image", "sharp", "tiny-glob"],
  },
});
