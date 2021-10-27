export const withPlaiceholder = (nextConfig) => {
  require("sharp");

  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      config.externals = Object.assign(config.externals, {
        sharp: "commonjs sharp",
      });

      if (typeof nextConfig?.webpack === "function") {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  });
};
