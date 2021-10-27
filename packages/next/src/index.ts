export const withPlaiceholder = (nextConfig) => {
  require("sharp");

  const sharp = "commonjs sharp";

  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (Array.isArray(config.externals)) {
        config.externals.push({ sharp });
      } else {
        config.externals = { ...config.externals, sharp };
      }

      if (typeof nextConfig?.webpack === "function") {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  });
};
