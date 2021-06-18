import plugin from "tailwindcss/plugin";
import makeSynchronous from "make-synchronous";
import type { IGetPlaiceholder } from "plaiceholder";
import { classNamePrefix } from "./config";

const getPlaiceholder = makeSynchronous(async (imageUrl) => {
  const { getPlaiceholder } = require("plaiceholder");

  const { css } = await (getPlaiceholder as IGetPlaiceholder)(imageUrl);

  return css;
});

export default plugin(({ config, matchUtilities }) => {
  if (config("mode") !== "jit") {
    throw Error("@plaiceholder/tailwindcss only supports JIT mode.");
  }

  console.warn(
    "warn - `@plaiceholder/tailwindcss` uses Tailwind's JIT engine and is not covered by semver."
  );

  matchUtilities({
    [classNamePrefix]: (url) => getPlaiceholder(url),
  });
});
