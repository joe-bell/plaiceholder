import plugin from "tailwindcss/plugin";
import makeSynchronous from "make-synchronous";
import type { IGetPlaiceholder } from "plaiceholder";
import { classNamePrefix } from "./config";

const getPlaiceholder = makeSynchronous(async (imageUrl) => {
  const { getPlaiceholder } = require("plaiceholder");

  const { css } = await (getPlaiceholder as IGetPlaiceholder)(imageUrl);

  return css;
});

export default plugin(({ matchUtilities }) => {
  matchUtilities({
    [classNamePrefix]: (url) => getPlaiceholder(url),
  });
});
