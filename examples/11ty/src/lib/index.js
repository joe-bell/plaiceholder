const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const CleanCSS = require("clean-css");

exports.getImage = async (imagePath) => {
  const file = await promisify(fs.readFile)(
    path.join("./src/assets/", imagePath)
  );
  return file;
};

exports.getStyles = () => {
  const file = fs.readFileSync(
    path.join(__dirname, "..", "styles", "index.css")
  );
  return new CleanCSS().minify(file).styles;
};

exports.stylesToString = (style) =>
  Object.keys(style).reduce((acc, cv) => {
    return `${(acc += cv
      .split(/(?=[A-Z])/)
      .join("-")
      .toLowerCase())}:${style[cv]};`;
  }, "");

exports.propsToString = (props) =>
  Object.keys(props).reduce((acc, cv) => {
    if (["viewBox", "preserveAspectRatio"].includes(cv)) {
      return [acc, `${cv}="${props[cv]}" `].join("");
    }

    if (cv === "style") {
      return [acc, `style="${stylesToString(props[cv])}" `].join("");
    }

    return `${(acc += cv
      .split(/(?=[A-Z])/)
      .join("-")
      .toLowerCase())}="${props[cv]}" `;
  }, "");
