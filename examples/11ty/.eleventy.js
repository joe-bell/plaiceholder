module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "public/assets": "assets" });
};
