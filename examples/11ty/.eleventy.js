const path = require("path");
const prettier = require("prettier");

const { imageGrid } = require("./src/_components/image-grid");
const {
  imageShortcode,
  imageWithPlaiceholderBase64,
  imageWithPlaiceholderCSS,
  imageWithPlaiceholderSVG,
} = require("./src/_lib/image");

module.exports = function (config) {
  config.addPassthroughCopy({ "public/assets": "assets" });

  config.addCollection("pages", (collection) =>
    collection.getFilteredByGlob("./src/_pages/**/*")
  );

  // Components
  config.addJavaScriptFunction("imageGrid", imageGrid);

  config.addJavaScriptFunction("image", imageShortcode);
  config.addJavaScriptFunction(
    "imageWithPlaiceholderBase64",
    imageWithPlaiceholderBase64
  );
  config.addJavaScriptFunction(
    "imageWithPlaiceholderCSS",
    imageWithPlaiceholderCSS
  );
  config.addJavaScriptFunction(
    "imageWithPlaiceholderSVG",
    imageWithPlaiceholderSVG
  );

  // Prettify output
  config.addTransform("prettier", function (content, outputPath) {
    const extname = path.extname(outputPath);

    return [".html", ".json"].includes(extname)
      ? prettier.format(content, { parser: extname.replace(/^./, "") })
      : content;
  });

  return {
    dir: {
      includes: "_includes",
      layouts: "_layouts",
    },
  };
};
