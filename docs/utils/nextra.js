/**
 * `nextra`-specific helpers
 */

/**
 * Identify production environment without having to constantly reference
 * `process.env.NODE_ENV`
 */
const isProduction = process.env.NODE_ENV === "production";

/**
 * **asset**
 *
 * Helper to source assets from the closed-source Plaiceholder.co project
 * @param {string} assetPath - relative asset path
 * @returns {string} relative asset path for production, absolute for dev
 */
const asset = (assetPath) =>
  isProduction ? assetPath : [process.env.SITE_URL, assetPath].join("");

module.exports = {
  asset,
  isProduction,
};
