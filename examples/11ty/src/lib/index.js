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
