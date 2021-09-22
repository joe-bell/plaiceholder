import plugin from "tailwindcss/plugin";
import makeSynchronous from "make-synchronous";
import type { IGetPlaiceholder } from "plaiceholder";
import { classNamePrefix } from "./config";

const getPlaiceholder = makeSynchronous(async (imageUrl) => {
  const { getPlaiceholder } = require("plaiceholder");

  const { css } = await (getPlaiceholder as IGetPlaiceholder)(imageUrl);

  return css;
});

export default plugin(async (props) => {
  if (typeof props === 'undefined') {
    // console.warn("warn - `@plaiceholder/tailwindcss` no props passed");
    return
  } else {
    console.warn(
      "warn - `@plaiceholder/tailwindcss` uses Tailwind's JIT engine and is not covered by semver."
    );
    const { config, matchUtilities } = props

    const configMode = await config("mode")

    if (typeof configMode === 'undefined') {
      // console.warn("warn - `@plaiceholder/tailwindcss` no config passed.");
      return
    } else {
      if (configMode !== "jit") {
        console.warn("warn - `@plaiceholder/tailwindcss` only supports JIT mode.");
        // console.warn(configMode)
      }
    }

    if (typeof matchUtilities === 'undefined') {
      // console.warn("warn - `@plaiceholder/tailwindcss` no matchUtilities passed.");
      return
    } else {
      matchUtilities({
        [classNamePrefix]: (url) => getPlaiceholder(url),
      });
    }

    // console.warn("warn - `@plaiceholder/tailwindcss` complete");

  }

});
