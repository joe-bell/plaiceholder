const { withPlaiceholder } = require("@plaiceholder/next");

/**
 * @type {import('next').NextConfig}
 */
const config = {
  experimental: { externalDir: true, images: { allowFutureImage: true } },
  images: {
    domains: ["images.unsplash.com"],
  },
};

module.exports = withPlaiceholder(config);
