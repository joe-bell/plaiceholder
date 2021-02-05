const withNextra = require("nextra")("nextra-theme-docs", "./theme.config.js");

const SITE_DOMAIN = "plaiceholder.co";
const SITE_URL = `https://${SITE_DOMAIN}`;
const DOCS_URL = `${SITE_URL}/docs`;

module.exports = withNextra({
  basePath: "/docs",
  env: {
    SITE_DOMAIN: "plaiceholder.co",
    SITE_URL,
    DOCS_URL,
  },
});
