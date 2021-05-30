const Image = require("@11ty/eleventy-img");
const { getPlaiceholder } = require("plaiceholder");
const { stylesToString } = require("./src/lib");

async function imageShortcode(src, alt, sizes) {
  // https://www.11ty.dev/docs/plugins/image/
  let metadata = await Image(src, {
    widths: [300, 600],
    formats: ["avif", "jpeg"],
    outputDir: "./_site/img/",
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes);
}

async function imageWithPlaiceholderCSS(src, alt, sizes) {
  return Promise.all([getPlaiceholder(src), imageShortcode(src, alt, sizes)])
    .then((values) => {
      const [plaiceholder, image] = values;

      return `<div class="relative block overflow-hidden">
        <div class="transform scale-150 filter blur-2xl" style="${stylesToString(
          plaiceholder.css
        )}">
        ${image}
        </div>
      </div>`;
    })
    .catch((err) => {
      throw err;
    });
}

module.exports = function (config) {
  config.addPassthroughCopy({ "public/assets": "assets" });

  config.addCollection("pages", (collection) =>
    collection.getFilteredByGlob("./src/pages/**/*")
  );

  config.addJavaScriptFunction("image", imageShortcode);
  config.addJavaScriptFunction(
    "imageWithPlaiceholderCSS",
    imageWithPlaiceholderCSS
  );

  return {
    dir: {
      includes: "_includes",
      layouts: "_layouts",
    },
  };
};
