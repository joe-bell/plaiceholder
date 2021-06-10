module.exports = function () {
  return {
    name: "local-plugin",
    configureWebpack() {
      return {
        resolve: {
          fallback: {
            path: require.resolve("path-browserify"),
          },
        },
      };
    },
  };
};
