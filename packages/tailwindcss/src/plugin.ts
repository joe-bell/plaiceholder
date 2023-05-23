import plugin from "tailwindcss/plugin.js";
import makeSynchronous from "make-synchronous";
import { classNamePrefix } from "./config.js";

const getPlaiceholder = makeSynchronous(async (buffer) => {
  const { getPlaiceholder } = await import("plaiceholder");
  const { css } = await getPlaiceholder(buffer);

  return css;
});

export interface PlaiceholderTailwindCSSOptions {
  resolver: (src: string) => Buffer;
}

export default plugin.withOptions<PlaiceholderTailwindCSSOptions>(function (
  options = {} as PlaiceholderTailwindCSSOptions
) {
  return function ({ matchUtilities }) {
    matchUtilities({
      [classNamePrefix]: function (src) {
        const file = options.resolver(src);

        return getPlaiceholder(file);
      },
    });
  };
});
