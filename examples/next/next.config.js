const { withPlaiceholder } = require("@plaiceholder/next");

module.exports = withPlaiceholder({
  images: {
    domains: ["images.unsplash.com"],
  },
  webpack: (config) => {
    config.externals.push({
      sharp: "commonjs sharp",
    });

    return config;
  },
  future: {
    webpack5: true,
  },
});
