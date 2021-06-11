const path = require("path");
const Image = require("@11ty/eleventy-img");
const { getPlaiceholder } = require("plaiceholder");
const { propsToString, stylesToString } = require("./to-string");

/**
 * @param {string} src
 * @param {string} alt
 * @param {string} sizes
 * @returns {Promise<string>}
 */
async function imageShortcode(src, alt, sizes) {
  // Prefix `public` to any local images
  const transformedSrc = src.startsWith("/") ? path.join("public", src) : src;

  // https://www.11ty.dev/docs/plugins/image/
  let metadata = await Image(transformedSrc, {
    widths: [300, 600],
    formats: ["avif", "jpeg"],
    outputDir: "./_site/img/",
  });

  let imageAttributes = {
    class: "w-full",
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  return Image.generateHTML(metadata, imageAttributes);
}

const plaiceholderClass =
  "z-[-1] absolute inset-0 transform scale-150 filter blur-2xl w-full h-full";

/**
 * @type {typeof imageShortcode}
 */
async function imageWithPlaiceholderBase64(src, alt, sizes) {
  return Promise.all([getPlaiceholder(src), imageShortcode(src, alt, sizes)])
    .then((values) => {
      const [{ base64 }, image] = values;

      return `
        <img
          alt=""
          src="${base64}"
          class="${plaiceholderClass}"
        />
        ${image}
      `;
    })
    .catch((err) => {
      throw err;
    });
}

/**
 * @type {typeof imageShortcode}
 */
async function imageWithPlaiceholderCSS(src, alt, sizes) {
  return Promise.all([getPlaiceholder(src), imageShortcode(src, alt, sizes)])
    .then((values) => {
      const [{ css }, image] = values;

      return `
        <div
          style="${stylesToString(css)}"
          class="${plaiceholderClass}"
        ></div>
        ${image}
      `;
    })
    .catch((err) => {
      throw err;
    });
}

/**
 * @type {typeof imageShortcode}
 */
async function imageWithPlaiceholderSVG(src, alt, sizes) {
  return Promise.all([getPlaiceholder(src), imageShortcode(src, alt, sizes)])
    .then((values) => {
      const [plaiceholder, image] = values;

      const [element, { style, ...props }, children] = plaiceholder.svg;

      return `
        <${element}
          style="${stylesToString({
            ...style,
            transform: ["scale(1.5)", style.transform].join(" "),
          })}"
          class="${plaiceholderClass}"
          ${propsToString(props)}
        >
          ${children
            .map(
              ([childElem, childProps]) =>
                `<${childElem} ${propsToString(childProps)} />`
            )
            .join("")}
        </${element}>
        ${image}
      `;
    })
    .catch((err) => {
      throw err;
    });
}

module.exports = {
  imageShortcode,
  imageWithPlaiceholderBase64,
  imageWithPlaiceholderCSS,
  imageWithPlaiceholderSVG,
};
