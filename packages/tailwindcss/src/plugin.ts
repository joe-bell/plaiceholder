import plugin from "tailwindcss/plugin";

import makeSynchronous from "make-synchronous";
import type { IGetPlaiceholder } from "plaiceholder";
import { classNamePrefix } from "./config";

const getPlaiceholder = makeSynchronous(async (imageUrl) => {
  const fs = require("node:fs/promises");
  const path = require("node:path");
  const { getPlaiceholder } = require("plaiceholder");

  const buffer = await fs.readFile(path.join("./public", imageUrl));

  const { css } = await (getPlaiceholder as IGetPlaiceholder)(buffer);

  return css;
});

export default plugin(({ matchUtilities }) => {
  matchUtilities({
    [classNamePrefix]: (url) => getPlaiceholder(url),
  });
});
