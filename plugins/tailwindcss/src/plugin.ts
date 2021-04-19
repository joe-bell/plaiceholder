import plugin from "tailwindcss/plugin";
import makeSynchronous from "make-synchronous";
import cssEscape from "css.escape";

const getPlaiceholder = makeSynchronous(async (imageUrl) => {
  const { getImage } = require("@plaiceholder/next");
  const { getPixelsCSS } = require("@plaiceholder/css");

  const image = await getImage(imageUrl);
  const pixelsCSS = await getPixelsCSS(image);
  return pixelsCSS;
});

const extractUrl = (className) => className.replace(/[\[\]']+/g, "");

export default plugin(({ config, matchUtilities }) => {
  if (config("mode") !== "jit") {
    throw Error("@plaiceholder/tailwindcss only supports JIT mode.");
  }

  console.warn("be careful");

  matchUtilities({
    plaiceholder: (modifier, b) => {
      const valid = modifier.match(/\[([^()]+)\]/g);

      if (Array.isArray(valid) && valid.length === 1) {
        const url = extractUrl(modifier);

        console.log(url);

        const style = {
          [`.${cssEscape(`plaiceholder-${modifier}`)}`]: getPlaiceholder(url),
        };

        return style;
      }

      return [];
    },
  });
});
