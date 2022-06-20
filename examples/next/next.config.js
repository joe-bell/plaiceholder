const { withPlaiceholder } = require("@plaiceholder/next");
const withTM = require("next-transpile-modules")(["@plaiceholder/ui"]);

/**
 * @type {import('next').NextConfig}
 */
const config = {
  images: {
    domains: ["images.unsplash.com"],
  },
};

module.exports = withPlaiceholder(withTM(config));
