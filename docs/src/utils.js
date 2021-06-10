const path = require("path");

const isProduction = process.env.NODE_ENV !== "development";

const domain = "plaiceholder.co";
const url = ["https://", domain].join("");

/** @param {string} [externalPathName] */
const withUrl = (externalPathName) =>
  externalPathName ? path.join(url, externalPathName) : url;

module.exports = {
  isProduction,
  domain,
  url,
  withUrl,
};
