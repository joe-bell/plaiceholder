import plugin from "tailwindcss/plugin";

import makeSynchronous from "make-synchronous";
import { classNamePrefix } from "./config";

const getPlaiceholder = makeSynchronous(async (buffer) => {
  const { css } = await require("plaiceholder").getPlaiceholder(buffer);

  return css;
});

interface PlaiceholderTailwindCSSOptions {
  resolver: (url: string) => Buffer;
}

export default plugin.withOptions<PlaiceholderTailwindCSSOptions>(function (
  options = {} as PlaiceholderTailwindCSSOptions
) {
  return function ({ matchUtilities }) {
    matchUtilities({
      [classNamePrefix]: function (url) {
        const file = options.resolver(url);

        return getPlaiceholder(file);
      },
    });
  };
});
