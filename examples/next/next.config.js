const { withPlaiceholder } = require("@plaiceholder/next");

/**
 * @type {import('next').NextConfig}
 */
const config = {
  images: {
    domains: ["images.unsplash.com"],
  },
};

module.exports = withPlaiceholder(config);
