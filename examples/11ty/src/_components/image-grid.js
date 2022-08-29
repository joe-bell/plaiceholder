const { imageList, imageListItem } = require("../_modules/@plaiceholder/ui");

/** @param {string|string[]} items */
function imageGrid(items) {
  const children = typeof items === "string" ? [items] : items;

  return `<ul class="${imageList({
    aspect: children.length > 2 ? "5/7" : "auto",
    columns: children.length > 2 ? 3 : 2,
  })}">
    ${children
      .map((item) => `<li class="${imageListItem()}">${item}</li>`)
      .join("")}
  </ul>`;
}

module.exports = { imageGrid };
