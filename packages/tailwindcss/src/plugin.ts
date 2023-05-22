import plugin from "tailwindcss/plugin.js";
import makeSynchronous from "make-synchronous";
import { classNamePrefix } from "./config.js";

const getPlaiceholder = makeSynchronous(async (buffer) => {
  const { css } = await require("plaiceholder").getPlaiceholder(buffer);

  return css;
});

export interface PlaiceholderTailwindCSSOptions {
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
