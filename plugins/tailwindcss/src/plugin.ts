import plugin from "tailwindcss/plugin";
import makeSynchronous from "make-synchronous";
import cssEscape from "css.escape";
import { classNamePrefix } from "./config";

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

  console.log(`
-----------------------------

@plaiceholder/tailwindcss

⚠️ WARNING
Just like JIT, this plugin is in preview.
Any changes are not covered by semver. Use with caution.

🙏 SPONSORS
Enjoying Plaiceholder?
Support further development at https://plaiceholder.co

-----------------------------`);

  matchUtilities({
    plaiceholder: (modifier) => {
      const valid = modifier.match(/\[([^()]+)\]/g);

      if (Array.isArray(valid) && valid.length === 1) {
        const url = extractUrl(modifier);
        const className = `.${cssEscape([classNamePrefix, modifier].join(""))}`;

        const style = {
          [className]: getPlaiceholder(url),
        };

        return style;
      }

      return [];
    },
  });
});
